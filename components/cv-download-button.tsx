"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export function CvDownloadButton() {
    const [isGenerating, setIsGenerating] = useState(false)

    const downloadPdf = async () => {
        const element = document.getElementById("cv-print-area")
        if (!element) return

        setIsGenerating(true)
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500))

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                windowWidth: 794, // Approx 210mm at 96 DPI
                windowHeight: 1123, // Approx 297mm at 96 DPI
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById("cv-print-area")
                    if (clonedElement) {
                        clonedElement.style.width = "210mm"
                        clonedElement.style.boxShadow = "none"
                        clonedElement.style.margin = "0"
                        clonedElement.style.border = "none"
                        clonedElement.classList.add("print-mode")
                        
                        // Fix for html2canvas not supporting modern CSS color functions (oklch, lab, etc.)
                        // and modern outline/border shorthand
                        const allElements = clonedElement.querySelectorAll("*")
                        allElements.forEach(el => {
                            if (el instanceof HTMLElement) {
                                // Force remove all properties that could trigger modern color parsing
                                el.style.outline = "none"
                                el.style.boxShadow = "none"
                                el.style.textDecorationColor = "currentColor"
                                el.style.textDecoration = "none"
                            }
                        })
                    }
                }
            })

            const imgData = canvas.toDataURL("image/jpeg", 0.95)
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            const pdfWidth = pdf.internal.pageSize.getWidth()
            const imgWidth = pdfWidth
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            
            // Add image with FAST compression
            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST")
            pdf.save("CV_Murathan_Aydin.pdf")
        } catch (error) {
            console.error("Failed to generate PDF:", error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="sticky bottom-6 sm:bottom-8 z-50 print:hidden mt-8 flex justify-end mr-4 px-4 sm:px-0">
            <Button 
                onClick={downloadPdf} 
                disabled={isGenerating}
                size="lg"
                className="rounded-full shadow-2xl bg-blue-800 hover:bg-blue-700 text-white flex gap-2 h-14 w-14 sm:w-auto px-0 sm:px-6 border-white/20 border transition-all hover:scale-105 active:scale-95 items-center justify-center flex-nowrap"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="hidden sm:inline ml-2">Génération...</span>
                    </>
                ) : (
                    <>
                        <Download className="w-5 h-5" />
                        <span className="hidden sm:inline">Télécharger CV (PDF)</span>
                    </>
                )}
            </Button>
        </div>
    )
}
