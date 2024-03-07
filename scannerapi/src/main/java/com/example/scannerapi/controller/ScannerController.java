package com.example.scannerapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.scannerapi.model.Barcodes;
import com.example.scannerapi.service.BarcodeService;

@RestController
@RequestMapping("api/scanner")
public class ScannerController {

    @Autowired 
    private BarcodeService barcodeService; 

	@GetMapping("/greeting")
	public String greeting() {
		return "Hello";
	}
	
	@GetMapping("/barcodes")
	public List<Barcodes> fetchDepartmentList() {
		return barcodeService.findAllBarcodes();
	}
	
	@GetMapping("/{barcode}")
	public List<Barcodes> findByBarcode(@RequestParam long barcode) {
		return barcodeService.findByBarcode(barcode);
	}
	
	@PutMapping("/{id}")
	public Barcodes updateBarcode(@RequestParam final Long id, @RequestBody final Barcodes barcodes) throws NotFoundException {
		return barcodeService.update(barcodes);
	}
	
	@PostMapping("/addBarcode")
	public Barcodes insertBarcode(@RequestBody Barcodes newBarcode) throws NotFoundException{
		return barcodeService.save(newBarcode);
	}
}