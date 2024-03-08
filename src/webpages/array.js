import React, { Fragment, useState } from "react";
import minCashFlow from "./script";

var finalAns = [];
var personColumn = [];
const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid green",
    borderRadius: 2,
    color: "green",
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: 'inherit',
    fontWeight: 800,
    padding: "5px 8px 5px 8px",
};

const DataTabelVariable = () => {
    const [rowValue, setRowValue] = useState(0);
    const [columnsValue, setColumnsValue] = useState(0);
    const [tableCellsData, setTableCellsData] = useState();
    const [tableArrayData] = useState([[]]);
    const [showResult, setShowResult] = useState(false);


    const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
        return `${rowNum}-${columnNum}`;
    };

    const onChangeHandler = (e) => {
        let [row, col] = e.target.name.split("-");
        if (row === col) {
            e.target.value = 0;
        }
        console.log(e.target.name, e.target.value);
        setTableCellsData({
            ...tableCellsData,
            [e.target.name]: e.target.value
        });
        setShowResult(false);
        row = parseInt(row);
        col = parseInt(col);

        if (!tableArrayData[row]) {
            tableArrayData[row] = [];
        }
        // console.log(row, col);
        tableArrayData[row][col] = e.target.value;
    };

    const generateTable = () => {
        let table = [];

        for (let i = 0; i < rowValue; i++) {
            let children = [];

            for (let j = 0; j < columnsValue; j++) {
                children.push(
                    <td key={j}>
                        <input
                            type="text"
                            name={getUniqueKeyFromArrayIndex(i, j)}
                            onChange={onChangeHandler}
                        />
                    </td>
                );
            }

            table.push(
                <tr key={i}>
                    <td>Person {i + 1} has to pay</td>
                    {children}
                </tr>
            );
        }
        return table;
    };

    function addZeros(array) {
        let graph = [];
        for (let i = 0; i < rowValue; i++) {
            let col = [];
            for (let j = 0; j < columnsValue; j++) {
                col.push(0);
            }
            graph[i] = col;
        }

        for (let p = 0; p < array.length; p++) {
            for (let i = 0; i < array[p].length; i++) {
                if (array[p][i] === undefined || array[p][i] === Array(0)) {
                    array[p][i] = 0;
                }
                graph[p][i] = array[p][i];
            }
        }
        console.log(graph);
        finalAns = [];
        finalAns = minCashFlow(graph);
    };

    const handleChangeInPersons = (e) => {
        const value = parseInt(e.target.value);
        setRowValue(value);
        setColumnsValue(value);
        setShowResult(false);
        personColumn = [];
        for (var i = 0; i < e.target.value; i++) {
            personColumn.push(`Person ${i + 1} `);
        }
    };

    const handleChangeInResult = (e) => {
        if (tableArrayData.length === 0 || rowValue === 0 || columnsValue === 0)
            return;
        addZeros(tableArrayData)
        setShowResult(true);
    };

    return (
        <Fragment>
            <div>
                <div style={{ marginTop: 20, display: "flex" }}>
                    <h4 style={{ paddingRight: 20 }}>Enter total number of persons involved in cash flow: </h4>
                    <input
                        type="number"
                        min="2"
                        max="10"
                        step="1"
                        onChange={handleChangeInPersons}
                    />
                </div>
                <div>
                    <h4>
                        For each cell, enter the amount that Person i has to pay to Person j. All values are 0 by default.
                        <br />Note: Diagonal values represent the person itself and cannot be changed.
                    </h4>
                </div>
                <br />
                <div className={"TableContainer"}>
                    <table>
                        <tbody style={{ backgroundColor: "green" }}>
                            {generateTable()}
                        </tbody>
                    </table>
                </div>
                <div style={{ paddingTop: 30 }}>
                    <input type="button" style={buttonStyle} onClick={handleChangeInResult} value={showResult ? "Result" : "Compute"} />
                </div>
                <div>
                    {showResult && (
                        <Fragment>
                            {finalAns.map((item, index) => (
                                <div key={index}>
                                    <h4>{item}</h4>
                                </div>
                            ))}
                        </Fragment>
                    )}
                </div>
                <h5>Time Complexity: O(n^2)</h5>
            </div>
        </Fragment>
    );
};

export default DataTabelVariable;
