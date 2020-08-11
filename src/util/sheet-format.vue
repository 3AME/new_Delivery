<script>
export default {
    CoordinateFile: {
        nodes: [
            {
                label: "type",
                field: "type",
                required: true,
                comment: "节点类型\ndepot：中心节点\ncustomer：客户\nother：其他节点"
            },
            {
                label: "name",
                field: "id",
                required: true,
                comment: "节点的名字或编号"
            },
            {
                label: "X",
                field: "x",
                required: true,
                comment: "点的横坐标（单位默认：km)"
            },
            {
                label: "Y",
                field: "y",
                required: true,
                comment: "点的纵坐标（单位默认：km)"
            },
            {
                label: "demand",
                field: "demand",
                required: false,
                default: 0,
                comment: "点的需求量，配送中心也可以写，这不影响路线的计算"
            },
            {
                label: "serviceTime",
                field: "service_time",
                required: false,
                default: 0,
                comment: "自定义该点的服务时间（默认：5min)"
            },
            {
                label: "beginTime",
                field: "tw_beg",
                required: false,
                default: -1,
                comment: "客户点接受配送到达的最早时间"
            },
            {
                label: "endTime",
                field: "tw_end",
                required: false,
                default: -1,
                comment: "客户点接受配送到达的最迟时间（单位默认：min)"
            }
        ],
        vehicles: [
            {
                label: "Vehicle_type",
                field: "id",
                required: true,
                comment: "车辆类型"
            },
            {
                label: "Vehicle_load",
                field: "load",
                required: true,
                comment: "车辆载重"
            },
            {
                label: "Vehicle_number",
                field: "count",
                required: false,
                default: -1,
                comment: "该车辆类型的数量"
            },
            {
                label: "Vehicle_mileage",
                field: "mileage",
                required: false,
                default: -1,
                comment: "车辆里程"
            },
            {
                label: "Center_name",
                field: "depot",
                required: false,
                comment: "车辆所在配送中心的名字，对应type=depot的name值"
            },
            {
                label: "Use_cost",
                field: "useCost",
                required: false,
                comment: "使用成本"
            },
            {
                label: "Driving_cost",
                field: "drivingCost",
                required: false,
                comment: "运行成本"
            },
            {
                label: "Waiting_cost",
                field: "waitingCost",
                required: false,
                comment: "等待成本"
            },
        ]
    },
    RouteFile: {
        nodes: [
            {
                label: "type",
                field: "type",
                required: true,
                comment: "节点类型\ndepot：中心节点\ncustomer：客户\nother：其他节点"
            },
            {
                label: "name_a",
                field: "id",
                required: true,
                comment: "点的数字编号"
            },
            {
                label: "demand",
                field: "demand",
                required: true,
                comment: "客户的需求量，配送中心也可以写，这不影响路线的计算"
            },
            {
                label: "serviceTime",
                field: "service_time",
                required: false,
                default: 0,
                comment: "自定义该点的服务时间（默认：5min)"
            },
            {
                label: "beginTime",
                field: "tw_beg",
                required: false,
                default: -1,
                comment: "客户点接受配送到达的最早时间（单位默认：min)"
            },
            {
                label: "endTime",
                field: "tw_end",
                required: false,
                default: -1,
                comment: "客户点接受配送到达的最迟时间（单位默认：min)"
            },
        ],
        vehicles: [
            {
                label: "Vehicle_type",
                field: "id",
                required: true,
                comment: "车辆类型"
            },
            {
                label: "Vehicle_load",
                field: "load",
                required: true,
                comment: "车辆载重（单位默认：t)"
            },
            {
                label: "Vehicle_number",
                field: "count",
                required: false,
                default: -1,
                comment: "该车辆类型的数量，可不做配置"
            },
            {
                label: "Vehicle_mileage",
                field: "mileage",
                required: false,
                default: -1,
                comment: "车辆里程，（默认：35km)"
            },
            {
                label: "Center_name",
                field: "depot",
                required: true,
                comment: "车辆所在配送中心的名字，对应type=\"depot\"类型点的的编号"
            },
            {
                label: "Use_cost",
                field: "useCost",
                required: false,
                comment: "使用成本"
            },
            {
                label: "Driving_cost",
                field: "drivingCost",
                required: false,
                comment: "运行成本"
            },
            {
                label: "Waiting_cost",
                field: "waitingCost",
                required: false,
                comment: "等待成本"
            },
        ]
    },
    _CheckFormat: function(ds, fmt) {
        let first = ds[0];
        if (!first) {
            return false;
        }
        for (let i in fmt) {
            if (fmt[i].required && !first.hasOwnProperty(fmt[i].label)) {
                return false;
            }
        }
        return true;
    },
    IsCoordinateFile: function(dsNodes, dsVehicles) {
        return this._CheckFormat(dsNodes, this.CoordinateFile.nodes)
            && this._CheckFormat(dsVehicles, this.CoordinateFile.vehicles);
    },
    IsRouteFile: function(dsNodes, dsVehicles) {
        return this._CheckFormat(dsNodes, this.RouteFile.nodes)
            && this._CheckFormat(dsVehicles, this.RouteFile.vehicles);
    }
};
</script>
