<script>
export default {
    CoordinateFile: {
        nodes: [
            {
                label: "type",
                field: "type",
                required: true
            },
            {
                label: "name",
                field: "id",
                required: true
            },
            {
                label: "name",
                field: "name",
                required: true
            },
            {
                label: "X",
                field: "x",
                required: true
            },
            {
                label: "Y",
                field: "y",
                required: true
            },
            {
                label: "demand",
                field: "demand",
                required: false,
                default: 0
            },
            {
                label: "serviceTime",
                field: "service_time",
                required: false,
                default: 0
            },
            {
                label: "beginTime",
                field: "tw_beg",
                required: false,
                default: -1
            },
            {
                label: "endTime",
                field: "tw_end",
                required: false,
                default: -1
            }
        ],
        vehicles: [
            {
                label: "Vehicle_type",
                field: "id",
                required: true
            },
            {
                label: "Vehicle_load",
                field: "load",
                required: true
            },
            {
                label: "Vehicle_number",
                field: "count",
                required: false,
                default: -1
            },
            {
                label: "Vehicle_mileage",
                field: "mileage",
                required: false,
                default: -1
            },
            {
                label: "Center_name",
                field: "depot",
                required: false
            },
            {
                label: "Use_cost",
                field: "useCost",
                required: false
            },
            {
                label: "Driving_cost",
                field: "drivingCost",
                required: false
            },
            {
                label: "Waiting_cost",
                field: "waitingCost",
                required: false
            },
        ]
    },
    RouteFile: {
        nodes: [
            {
                label: "type",
                field: "type",
                required: true
            },
            // {
            //     label: "name_a",
            //     field: "name",
            //     required: true
            // },
            {
                label: "name_a",
                field: "id",
                required: true
            },
            {
                label: "demand",
                field: "demand",
                required: true
            },
            {
                label: "serviceTime",
                field: "service_time",
                required: false,
                default: 0
            },
            {
                label: "beginTime",
                field: "tw_beg",
                required: false,
                default: -1
            },
            {
                label: "endTime",
                field: "tw_end",
                required: false,
                default: -1
            },
        ],
        vehicles: [
            {
                label: "Vehicle_type",
                field: "id",
                required: true
            },
            {
                label: "Vehicle_load",
                field: "load",
                required: true
            },
            {
                label: "Vehicle_number",
                field: "count",
                required: false,
                default: -1
            },
            {
                label: "Vehicle_mileage",
                field: "mileage",
                required: false,
                default: -1
            },
            {
                label: "Center_name",
                field: "depot",
                required: true
            },
            {
                label: "Use_cost",
                field: "useCost",
                required: false
            },
            {
                label: "Driving_cost",
                field: "drivingCost",
                required: false
            },
            {
                label: "Waiting_cost",
                field: "waitingCost",
                required: false
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