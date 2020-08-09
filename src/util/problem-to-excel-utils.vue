<script>
import sheetFormat from "./sheet-format";
import * as xlsx from "xlsx";
import { ipcRenderer } from "electron";
export default {
  // problem: undefined,
  // routeMode: false,
  // errorCallback: undefined,
  // successCallback: undefined,
  // setProblem(pro) {
  //   this.problem = pro;
  //   return this;
  // },
  // setRouteMode(mode) {
  //   this.routeMode = mode;
  //   return this;
  // },
  // onError(callback) {
  //   this.errorCallback = callback;
  //   return this;
  // },
  // onSuccess(callback) {
  //   this.successCallback = callback;
  //   return this;
  // },
  // save() {
  //   let workbook = xlsx.utils.book_new();
  //   let sheets = sheetFormat.RouteFile;

  //   if (!this.problem.nodes) {
  //     this.problem.nodes = [
  //       { type: "depot", name: 0 },
  //       { type: "customer", name: 1 },
  //       { type: "other", name: 2 },
  //     ];
  //   }

  //   if (!this.problem.edges) {
  //     this.problem.edges = [
  //       { u: 0, v: 1, w: 5 },
  //       { u: 0, v: 2, w: 5 },
  //       { u: 1, v: 2, w: 10 },
  //     ];
  //   }

  //   if (!this.problem.vehicles) {
  //     this.problem.vehicles = [];
  //   }

  //   let aoa = [];

  //   let header = sheets.nodes.map((it) => {
  //     return it.label;
  //   });

  //   let ids = this.problem.nodes.map((node) => {
  //     header.push(node.id);
  //     return node.id;
  //   });

  //   aoa.push(header);

  //   let distanceMap = new Map();
  //   this.problem.edges.forEach((edge) => {
  //     distanceMap.set(edge.u + "-" + edge.v, edge.w);
  //   });

  //   this.problem.nodes.forEach((node) => {
  //     let row = [];
  //     for (let col of sheets.nodes) {
  //       row.push(node[col.field]);
  //     }
  //     ids.forEach((id) => {
  //       if (node.id == id) {
  //         row.push(0);
  //       } else if (distanceMap.has(node.id + "-" + id)) {
  //         row.push(distanceMap.get(node.id + "-" + id));
  //       } else if (distanceMap.has(id + "-" + node.id)) {
  //         row.push(distanceMap.get(id + "-" + node.id));
  //       } else {
  //         row.push("");
  //       }
  //     });

  //     aoa.push(row);
  //   });

  //   xlsx.utils.book_append_sheet(
  //     workbook,
  //     xlsx.utils.aoa_to_sheet(aoa),
  //     "节点信息"
  //   );

  //   xlsx.utils.book_append_sheet(
  //     workbook,
  //     this._TemplateToSheet(this.problem.vehicles, sheets.vehicles),
  //     "车辆信息"
  //   );

  //   this._WriteFile(null, workbook, fileName);
  // },
  _TemplateToSheet(data, sheetFormat) {
    let aoa = [];
    aoa.push(
      // 表头
      sheetFormat.map((it) => {
        return it.label;
      })
    );
    if (data) {
      // 记录
      for (let node of data) {
        let row = [];
        for (let col of sheetFormat) {
          row.push(node[col.field]);
        }
        aoa.push(row);
      }
    }
    
    // 格式说明
    const A = 'A'.charCodeAt();
    for (let i = 0; i < sheetFormat.length; i++) {
      let cell = String.fromCharCode(A + i) + '1';
      xlsx.utils.cell_add_comment(
        worksheet[cell],
        sheetFormat[i].comment,
        "格式说明");
      worksheet[cell].c.hidden = true;
    }
    
    let worksheet = xlsx.utils.aoa_to_sheet(aoa);
    return worksheet;
  },
  coordinateToExcel(me, problem, fileName = "坐标查询文件") {
    if (!problem.nodes) {
      problem.nodes = [];
    }
    if (!problem.vehicles) {
      problem.vehicles = [];
    }
    let workbook = xlsx.utils.book_new();
    let sheets = sheetFormat.CoordinateFile;
    xlsx.utils.book_append_sheet(
      workbook,
      this._TemplateToSheet(problem.nodes, sheets.nodes),
      "节点信息"
    );
    xlsx.utils.book_append_sheet(
      workbook,
      this._TemplateToSheet(problem.vehicles, sheets.vehicles),
      "车辆信息"
    );
    this._WriteFile(me, workbook, fileName);
  },
  routeToExcel(me, problem, fileName = "路线查询文件") {
    let workbook = xlsx.utils.book_new();
    let sheets = sheetFormat.RouteFile;

    if (!problem.nodes) {
      problem.nodes = [
        { type: "depot", name: 0 },
        { type: "customer", name: 1 },
        { type: "other", name: 2 },
      ];
    }

    if (!problem.edges) {
      problem.edges = [
        { u: 0, v: 1, w: 5 },
        { u: 0, v: 2, w: 5 },
        { u: 1, v: 2, w: 10 },
      ];
    }

    if (!problem.vehicles) {
      problem.vehicles = [];
    }

    let aoa = [];

    let header = sheets.nodes.map((it) => {
      return it.label;
    });

    let ids = problem.nodes.map((node) => {
      header.push(node.id);
      return node.id;
    });

    aoa.push(header);

    let distanceMap = new Map();
    problem.edges.forEach((edge) => {
      distanceMap.set(edge.u + "-" + edge.v, edge.w);
    });

    problem.nodes.forEach((node) => {
      let row = [];
      for (let col of sheets.nodes) {
        row.push(node[col.field]);
      }
      ids.forEach((id) => {
        if (node.id == id) {
          row.push(0);
        } else if (distanceMap.has(node.id + "-" + id)) {
          row.push(distanceMap.get(node.id + "-" + id));
        } else if (distanceMap.has(id + "-" + node.id)) {
          row.push(distanceMap.get(id + "-" + node.id));
        } else {
          row.push("");
        }
      });

      aoa.push(row);
    });

    // 格式说明
    let nodeSheet = xlsx.utils.aoa_to_sheet(aoa);
    const A = 'A'.charCodeAt();
    for (let i = 0; i < sheets.nodes.length; i++) {
      let cell = String.fromCharCode(A + i) + '1';
      xlsx.utils.cell_add_comment(
        nodeSheet[cell],
        sheets.nodes[i].comment,
        "格式说明");
      nodeSheet[cell].c.hidden = true;
    }
    
    xlsx.utils.book_append_sheet(
      workbook,
      nodeSheet,
      "节点信息"
    );

    xlsx.utils.book_append_sheet(
      workbook,
      this._TemplateToSheet(problem.vehicles, sheets.vehicles),
      "车辆信息"
    );

    this._WriteFile(me, workbook, fileName);
  },
  _WriteFile(me, workbook, fileName) {
    // let me = this;
    ipcRenderer.send("open-save-dialog", fileName);
    ipcRenderer.once("selectedItem", function (e, path) {
      console.log("writeFile e.name=" + e.name);
      console.log("writeFile e.message=" + e.message);
      console.log("writeFile path=" + path);
      if (path) {
        try {
          xlsx.writeFile(workbook, path);
          me.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
          });
        } catch (err) {
          console.log("writeFile err.name=" + err.name);
          console.log("writeFile err.message=" + err.message);
          me.$notify.error({
            title: "错误",
            message: "出错了：" + err.message,
          });
        }
      }
    });
  },
};
</script>
