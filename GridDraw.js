const Turnings = {
    Normal: 0
    , DropD: 10
    , DropCSharp: 9
    , DropC: 8
};

function CreateGridInstance() {
    const Columns = [
        "Open"
        , "1"
        , "2"
        , "3"
        , "4"
        , "5"
        , "6"
        , "7"
        , "8"
        , "9"
        , "10"
        , "11"
        , "12"
        , "13"
        , "14"
        , "15"
        , "16"
    ];
    return new gridjs.Grid({
        columns: Columns,
        data: [], // 初期データは空にしておく
        // sort: true,
        // search: true,
        // pagination: {
        //     enabled: true,
        //     limit: 2
        // }
    });
}

function TurningInit() {
    let turningSelect = document.getElementById("Turning");
    if (turningSelect.length > 0) {
        return;
    }

    const keys = Object.keys(Turnings);
    keys.forEach(function (item) {
        let opt = document.createElement("option");
        opt.setAttribute("value", item);
        opt.innerHTML = item;
        turningSelect.appendChild(opt);
    })
    turningSelect.selectedIndex = 0;
    DrawGrid();
}

function CalcTurning(selectedTurning) {
    const Stinrgs = {
        E_High: 12
        , B: 7
        , G: 3
        , D: 10
        , A: 5
        , E: 0
    };
    const Chord = [
        "E"
        , "F"
        , "F#"
        , "G"
        , "G#"
        , "A"
        , "A#"
        , "B"
        , "C"
        , "C#"
        , "D"
        , "D#"
    ];
    let row = [];
    for (const item in Stinrgs) {
        let index = 1;
        let offset = Stinrgs[item];
        switch (Turnings[selectedTurning]) {
            case Turnings.DropD:
                if (Stinrgs[item] == Stinrgs.E) {
                    index += Turnings[selectedTurning];
                }
                break;
            case Turnings.DropC:
                if (Stinrgs[item] == Stinrgs.E) {
                    index += Turnings[selectedTurning];
                } else {
                    index += Turnings[selectedTurning] + 2;
                }
                break;
            case Turnings.DropCSharp:
                if (Stinrgs[item] == Stinrgs.E) {
                    index += Turnings[selectedTurning];
                } else {
                    index += Turnings[selectedTurning] + 2;
                }
                break;
            default:
                break;
        }
        const chordList = new LoopingArray(Chord);
        let column = [];
        column.push(chordList.get(index + offset - 1));
        for (let i = 0; i < 16; i++) {
            column.push(chordList.get(index++ + offset));
        };
        row.push(column);
    }
    return row;
}

function DrawGrid() {
    let turning = document.getElementById("Turning").value;
    let gridData = CalcTurning(turning);
    grid.updateConfig({ data: gridData }).forceRender();
    data: gridData
}

