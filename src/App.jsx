import React, { useState, useEffect } from "react";
import Head from "./components/Head";

function App() {
  const [randomNumber, setRandomNumber] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [randomTwoDigitNumber, setRandomTwoDigitNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const storedRandomNumber = localStorage.getItem("randomNumber");
    const storedRandomNumbers = JSON.parse(
      localStorage.getItem("randomNumbers")
    );
    const storedRandomTwoDigitNumber = localStorage.getItem(
      "randomTwoDigitNumber"
    );

    if (storedRandomNumber) {
      setRandomNumber(storedRandomNumber);
    }
    if (storedRandomNumbers) {
      setRandomNumbers(storedRandomNumbers);
    }
    if (storedRandomTwoDigitNumber) {
      setRandomTwoDigitNumber(storedRandomTwoDigitNumber);
    }
  }, []);

  const generateRandomNumber = () => {
    const min = 0;
    const max = 999;
    const minTwoDigit = 0;
    const maxTwoDigit = 99;

    const randomNum1 = Math.floor(Math.random() * (max - min + 1))
      .toString()
      .padStart(3, "0");
    const randomNum2 = Math.floor(Math.random() * (max - min + 1))
      .toString()
      .padStart(3, "0");
    const randomNum3 = Math.floor(Math.random() * (max - min + 1))
      .toString()
      .padStart(3, "0");
    const randomNum4 = Math.floor(Math.random() * (max - min + 1))
      .toString()
      .padStart(3, "0");
    const randomTwoDigit = Math.floor(
      Math.random() * (maxTwoDigit - minTwoDigit + 1)
    )
      .toString()
      .padStart(2, "0");

    setRandomNumber(randomNum1);
    setRandomNumbers([randomNum2, randomNum3, randomNum4]);
    setRandomTwoDigitNumber(randomTwoDigit);

    localStorage.setItem("randomNumber", randomNum1);
    localStorage.setItem(
      "randomNumbers",
      JSON.stringify([randomNum2, randomNum3, randomNum4])
    );
    localStorage.setItem("randomTwoDigitNumber", randomTwoDigit);
  };

  const handleCheckResult = () => {
    if (!inputNumber) {
      setResult("กรุณากรอกเลขล็อตเตอรี่");
      return;
    }

    if (!/^\d{3}$/.test(inputNumber)) {
      setResult("โปรดใส่เลขล็อตเตอรี่เป็นตัวเลข 3 หลักเท่านั้น");
      return;
    }

    if (inputNumber === randomNumber) {
      setResult(inputNumber + " " + "ถูกรางวัลที่ 1");
    } else if (
      inputNumber === String(Number(randomNumber) - 1).padStart(3, "0") ||
      inputNumber === String(Number(randomNumber) + 1).padStart(3, "0")
    ) {
      setResult(inputNumber + " " + "ถูกรางวัลเลขข้างเคียงรางวัลที่ 1");
    } else if (randomNumbers.includes(inputNumber)) {
      setResult(inputNumber + " " + "ถูกรางวัลที่ 2");
    } else if (inputNumber.slice(-2) === randomTwoDigitNumber) {
      setResult(inputNumber + " " + "ถูกรางวัลเลขท้าย 2 ตัว");
    } else {
      setResult(inputNumber + " " + "ไม่ถูกรางวัล");
    }
  };

  return (
    <>
      <Head />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4 font-Anuphan ">
          <div>
            <div>
              <h1 className="text-2xl p-3 font-bold">
                ผลการออกรางวัลล็อตเตอรี่
              </h1>
            </div>
            <button
              onClick={generateRandomNumber}
              className="bg-opacity-25 bg-white border-2 border-black text-black font-bold py-2 px-4 rounded-full"
            >
              ดำเนินการสุ่มรางวัล
            </button>
          </div>
          <div>
            <table className="table-auto w-full mt-3">
              <tbody>
                <tr>
                  <td className="text-center py-2 px-2 border border-black font-bold">
                    รางวัลที่ 1
                  </td>
                  <td className="text-center py-2 px-2 border border-black font-bold ">
                    <div>{randomNumber}</div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center py-2 px-2 border border-black font-bold">
                    รางวัลเลขข้างเคียงรางวัลที่ 1
                  </td>
                  <td className="text-center py-2 px-2 border border-black">
                    <div className="flex flex-row justify-center font-bold">
                      {randomNumber &&
                        String(Number(randomNumber) - 1).padStart(3, "0")}{" "}
                      {randomNumber &&
                        String(Number(randomNumber) + 1).padStart(3, "0")}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center py-2 px-2 border border-black font-bold">
                    รางวัลที่ 2
                  </td>
                  <td className="text-center py-2 px-2 border border-black">
                    <div className="flex flex-row justify-center font-bold">
                      {randomNumbers && randomNumbers[0]}{" "}
                      {randomNumbers && randomNumbers[1]}{" "}
                      {randomNumbers && randomNumbers[2]}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-center py-2 px-2 border border-black font-bold">
                    รางวัลเลขท้าย 2 ตัว
                  </td>
                  <td className="text-center py-2 px-2 border border-black font-bold">
                    {randomTwoDigitNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 border border-black">
            <div className="text-xl bg-cyan-400 text-white p-3">
              <div>ตรวจรางวัลล็อตเตอรี่</div>
            </div>
            <div className="text-l flex p-3 gap-2">
              <div className="py-2">เลขล็อตเตอรี่ : </div>
              <input
                type="text"
                className="border border-black rounded-full px-3 py-2"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
              />
            </div>
            {result && (
              <div className="mt-3 bg-orange-300">
                <div className="text-xl text-black p-3">
                  <div>{result}</div>
                </div>
              </div>
            )}
            <div className="p-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full ml-2"
                onClick={handleCheckResult}
              >
                ตรวจรางวัล
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
