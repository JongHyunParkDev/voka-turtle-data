const fs = require("fs");
const path = require("path");

function splitCSV(inputFilePath, linesPerFile = 40) {
    try {
        const csvContent = fs.readFileSync(inputFilePath, "utf8");
        const lines = csvContent.split("\n");
        
        const nonEmptyLines = lines.filter(line => line.trim() !== "");
        
        console.log(`총 ${nonEmptyLines.length}줄의 데이터를 읽었습니다.`);
        
        const totalFiles = Math.ceil(nonEmptyLines.length / linesPerFile);
        
        for (let i = 0; i < totalFiles; i++) {
            const startIndex = i * linesPerFile;
            const endIndex = Math.min(startIndex + linesPerFile, nonEmptyLines.length);
            
            const chunk = nonEmptyLines.slice(startIndex, endIndex);
            
            const originalFileName = path.basename(inputFilePath, ".csv");
            const outputFileName = `${originalFileName}_day${i + 1}.csv`;
            const outputPath = path.join(path.dirname(inputFilePath), outputFileName);
            
            fs.writeFileSync(outputPath, chunk.join("\n"), "utf8");
            
            console.log(`파일 저장 완료: ${outputFileName} (${chunk.length}줄)`);
        }
        
        console.log(`\n총 ${totalFiles}개의 파일로 분할 완료!`);
        
    } catch (error) {
        console.error("오류 발생:", error.message);
    }
}

const inputFile = "aa.csv";
const linesPerFile = 40;

console.log("CSV 파일 분할을 시작합니다...");
console.log(`입력 파일: ${inputFile}`);
console.log(`파일당 줄 수: ${linesPerFile}`);
console.log("----------------------------------------");

splitCSV(inputFile, linesPerFile);
