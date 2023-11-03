import { printer, types } from 'node-thermal-printer';
import fs from 'fs';
import foodRepository from '../repository/food.repository.js';

async function activatePrinter(body) {
 
  const food = await foodRepository.findById(body.foodId)

  const print = new printer({
    type: types.EPSON,
    interface: 'printerName:Star_TSP143',
    characterSet: 'SLOVENIA'
  });

  print.alignCenter();
  print.println(`name: ${body.name}`);
  print.println(`value delivered: ${body.valueDelivered}`);
  print.println(`method payment: ${body.payment}`);
  print.println(`name food: ${food.name}`);
  print.println(`change: ${body.change}`);
  print.println(`quant: ${body.quant}`);
  if(body.adds.length >= 1) {
    for (let i = 0; i < body.adds.length; i++) {
      print.println(`adds: ${body.adds[i].name}`);
    }
  }
  print.cut();

  // Simule a impressão em um arquivo
  const outputFilePath = 'print.txt';
  fs.writeFileSync(outputFilePath, print.getBuffer());
}

const printerService = {
    activatePrinter
}

export default printerService;