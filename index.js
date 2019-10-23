var PdfPrinter = require('pdfmake')

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function makePaper() {
    const numbers = [2,3,4,5,6,7,8,9,11,12]

    const tal = () => random(numbers) + ' x ' + random(numbers) + ' = '

    let result = {
        style: 'tableExample',
        table: {
            widths: ['*', '*', '*', '*'],
            heights: 22,
            body: []
        },
    }
    for (let step = 0; step < 25; step++) {
        result.table.body.push([tal(),tal(),tal(),tal()])
    }

    return result;
}


// Define font files
var fonts = {
    Roboto: {
      normal: 'node_modules/roboto-fontface/fonts/roboto/Roboto-Regular.woff',
      bold: 'node_modules/roboto-fontface/fonts/roboto/Roboto-Medium.woff',
      italics: 'node_modules/roboto-fontface/fonts/roboto/Roboto-Italic.woff',
      bolditalics: 'node_modules/roboto-fontface/fonts/roboto/Roboto-MediumItalic.woff'
    }
  }
  
var printer = new PdfPrinter(fonts)
var fs = require('fs')

var docDefinition = {
    pageSize: 'A4',
    pageMargins: [ 40, 60, 40, 60 ],
    content: makePaper(),
    styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	defaultStyle: {
		// alignment: 'justify'
	}
}

var pdfDoc = printer.createPdfKitDocument(docDefinition)
pdfDoc.pipe(fs.createWriteStream('mattepapper.pdf'))
pdfDoc.end()
