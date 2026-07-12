import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateReport = (result, user) => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("PrepMate AI Interview Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Candidate: ${user.name}`, 20, 35);

    doc.text(
        `Date: ${new Date(result.$createdAt).toLocaleString()}`,
        20,
        43
    );

    doc.text(`Overall Score: ${result.score}%`, 20, 51);

    autoTable(doc, {
        startY: 60,
        head: [["Skill", "Score"]],
        body: [
            ["Communication", result.communication],
            ["Technical", result.technicalKnowledge],
            ["Problem Solving", result.problemSolving],
        ],
    });

    let y = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(16);
    doc.text("Strengths", 20, y);

    doc.setFontSize(11);

    result.strengths
        .split("\n")
        .forEach((item) => {
            y += 8;
            doc.text(`• ${item}`, 25, y);
        });

    y += 15;

    doc.setFontSize(16);
    doc.text("Areas to Improve", 20, y);

    doc.setFontSize(11);

    result.weaknesses
        .split("\n")
        .forEach((item) => {
            y += 8;
            doc.text(`• ${item}`, 25, y);
        });

    y += 15;

    doc.setFontSize(16);
    doc.text("AI Feedback", 20, y);

    y += 8;

    doc.setFontSize(11);

    const feedback = doc.splitTextToSize(
        result.feedback,
        170
    );

    doc.text(feedback, 20, y);

    doc.save("PrepMate-Interview-Report.pdf");
};

export default generateReport;