import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import generateReportCard from "./pdfGenerator.js";
import fs from "fs";
import path from "path"; 
import { homedir } from "os";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.post('/getReport', (req, res) => {
    const allData = req.body.inputValues;
    const id = req.body.rollNumber;

    const destructuredData = {};

    Object.keys(allData).forEach(key => {
        const [subject, detail] = key.split('_');
        if (!destructuredData[subject]) {
            destructuredData[subject] = {};
        }
        destructuredData[subject][detail] = allData[key];
    });
 
    const homeDir = homedir();

    const projectRoot = path.join(homeDir, 'myCodes', 'clonedRepos', 'randomProject');
    const outputDir = path.join(projectRoot, 'backend', 'reports');
    const outputPath = path.join(outputDir, 'report_card.pdf');

 
    fs.mkdirSync(outputDir, { recursive: true });

    console.log(`Generating report card...`);
    
    generateReportCard(destructuredData, id,outputPath)
        .then(() => {
            console.log(`PDF generation completed successfully.`);

            
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="report_card.pdf"`);
            res.sendFile(outputPath);
        })
        .catch((error) => {
            console.error("Error generating report card:", error);
            res.status(500).send("Failed to generate report card");
        });
 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
