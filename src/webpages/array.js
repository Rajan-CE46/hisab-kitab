import React, { Fragment, useState } from "react";
import minCashFlow from "./script";

const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid rgb(255, 255, 255)",
    borderRadius: 2,
    color: "#ff7366",
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: 'inherit',
    fontWeight: 800,
    padding: "5px 8px 5px 8px",
};

const DataTabelVariable = () => {
    const [rowValue, setRowValue] = useState(0);
    const [tableArrayData, setTableArrayData] = useState([[]]);
    const [showResult, setShowResult] = useState(false);
    const [finalAns, setFinalAns] = useState([]);

    const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
        return `${rowNum}-${columnNum}`;
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        let [row, col] = name.split("-");
        if (row === col) {
            e.target.value = 0;
        }
        setTableArrayData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setShowResult(false);
        row = parseInt(row);
        col = parseInt(col);

        if (!tableArrayData[row]) {
            setTableArrayData(prevData => {
                const newData = [...prevData];
                newData[row] = [];
                return newData;
            });
        }
        const newData = [...tableArrayData];
        newData[row][col] = value;
        setTableArrayData(newData);
    };

    const generateTable = () => {
        let table = [];

        for (let i = 0; i < rowValue; i++) {
            let children = [];

            for (let j = 0; j < rowValue; j++) {
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

    const addZeros = (array) => {
        let graph = [];
        for (let i = 0; i < rowValue; i++) {
            let col = [];
            for (let j = 0; j < rowValue; j++) {
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

        let finalAns = minCashFlow(graph);
        return finalAns;
    };

    const handleChangeInPersons = (e) => {
        const value = parseInt(e.target.value);
        setRowValue(value);
        setShowResult(false);
        setTableArrayData(new Array(value).fill(new Array(value).fill(0)));
    };

    const handleChangeInResult = () => {
        if (tableArrayData.length === 0 || rowValue === 0) return;
        const finalAns = addZeros(tableArrayData);
        setFinalAns(finalAns);
        setShowResult(true);
    };

    return (
        <Fragment>
            <div>
                <div style={{ marginTop: 20, display: "flex" }}>
                    <h4 style={{ paddingRight: 20 }}>Enter total number of persons involved in cash flow: </h4>
                    <input
                        type="number"
                        min="3"
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
                        <tbody style={{ backgroundColor: "#ff7366" }}>
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
