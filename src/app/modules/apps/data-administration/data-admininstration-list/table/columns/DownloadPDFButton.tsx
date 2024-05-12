import React from 'react'
import html2pdf from 'html2pdf.js'

const DownloadPDFButton = ({name = '', url = ''}: any) => {
  const handleDownload = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
    // const element = document.getElementById('pdf-content') // Provide an ID to the root element
    // console.log({element})
    // if (element) {
    //   const opt = {
    //     margin: 10,
    //     filename: `${name}.pdf`,
    //     image: {type: 'jpeg', quality: 0.98},
    //     html2canvas: {scale: 2},
    //     jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
    //   }
    //   html2pdf().from(element).set(opt).save()
    // }
  }

  return (
    <button
      type='button'
      className='btn btn-primary mt-10'
      onClick={() => handleDownload()}
      style={{backgroundColor: '#0c3739', float: 'right'}}
    >
      Download PDF
    </button>
  )
}

export default DownloadPDFButton
