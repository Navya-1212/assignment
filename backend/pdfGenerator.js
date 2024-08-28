import PDFDocument from "pdfkit";
import fs from "fs";

export default function generateReportCard(data, id, outputPath) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        // -------------------------------
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        doc.fontSize(18).text('Report Card', { align: 'center' });

        doc.fontSize(12).text(`Roll Number: ${id}`, { align: 'left' });
        doc.moveDown();

        const columnWidths = {
            periodicTest: 70,
            noteBook: 60,
            subjectEnrichment: 100,
            annualExamination: 105,
            marksObtained: 90,
            grade: 100,
            subject: 100
        };

        const startX = 3;
        const columnStartX = {
            subject: startX,
            periodicTest: startX + columnWidths.subject,
            noteBook: startX + columnWidths.subject + columnWidths.periodicTest,
            subjectEnrichment: startX + columnWidths.subject + columnWidths.periodicTest + columnWidths.noteBook,
            annualExamination: startX + columnWidths.subject + columnWidths.periodicTest + columnWidths.noteBook + columnWidths.subjectEnrichment,
            marksObtained: startX + columnWidths.subject + columnWidths.periodicTest + columnWidths.noteBook + columnWidths.subjectEnrichment + columnWidths.annualExamination,
            grade: startX + columnWidths.subject + columnWidths.periodicTest + columnWidths.noteBook + columnWidths.subjectEnrichment + columnWidths.annualExamination + columnWidths.marksObtained
        };

       
        doc.fontSize(9).font('Times-Bold')
            .text('Subject', columnStartX.subject, 120, { width: columnWidths.subject, align: 'center' })
            .text('Periodic Test (10)', columnStartX.periodicTest, 120, { width: columnWidths.periodicTest, align: 'center' })
            .text('Note Book (5)', columnStartX.noteBook, 120, { width: columnWidths.noteBook, align: 'center' })
            .text('Subject Enrichment (5)', columnStartX.subjectEnrichment, 120, { width: columnWidths.subjectEnrichment, align: 'center' })
            .text('Annual Examination (80)', columnStartX.annualExamination, 120, { width: columnWidths.annualExamination, align: 'center' })
            .text('Marks Obtained (100)', columnStartX.marksObtained, 120, { width: columnWidths.marksObtained, align: 'center' })
            .text('Grade', columnStartX.grade, 120, { width: columnWidths.grade, align: 'center' });

        doc.moveDown();
        doc.moveDown();
        let y = 140; 
        for (let subject in data) {
            doc.text(subject, columnStartX.subject, y, { width: columnWidths.subject, align: 'center' })
                .text(data[subject].PeriodicTest, columnStartX.periodicTest, y, { width: columnWidths.periodicTest, align: 'center' })
                .text(data[subject].NoteBook, columnStartX.noteBook, y, { width: columnWidths.noteBook, align: 'center' })
                .text(data[subject].SubjectEnrichment, columnStartX.subjectEnrichment, y, { width: columnWidths.subjectEnrichment, align: 'center' })
                .text(data[subject].AnnualExamination, columnStartX.annualExamination, y, { width: columnWidths.annualExamination, align: 'center' })
                .text(data[subject].MarksObtained, columnStartX.marksObtained, y, { width: columnWidths.marksObtained, align: 'center' })
                .text(data[subject].Grade, columnStartX.grade, y, { width: columnWidths.grade, align: 'center' });
            y += 20;
        }
  
        doc.end();

        // ------------------------
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}