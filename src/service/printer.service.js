import { printer, types } from 'node-thermal-printer';
import fs from 'fs';
import foodRepository from '../repository/food.repository.js';

async function activatePrinter(body) {
 
  const food = await foodRepository.findById(body.foodId)

  const print = new printer({
    type: types.EPSON,
    interface: 'printerName:Star_TSP143',
    
  });

  print.alignCenter();
  print.println(`name: ${body.name}`);
  print.println(`value delivered: ${body.valueDelivered}`);
  print.println(`method payment: ${body.payment}`);
  print.println(`name food: ${food.name}`);
  print.println(`change: ${body.change}`);
  print.println(`quant: ${body.quant}`);
  print.cut();

  // Simule a impressão em um arquivo
  const outputFilePath = 'impressao.txt';
  fs.writeFileSync(outputFilePath, print.getBuffer());
}

const printerService = {
    activatePrinter
}

export default printerService;