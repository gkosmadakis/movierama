package com.example.scannerapi.service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.scannerapi.model.Barcodes;

public interface BarcodeService {
	
	@Query(value = "SELECT * from Barcodes Where Barcode=:barcode", nativeQuery=true)
	List<Barcodes> findByBarcode(@Param("barcode") long barcode);
	
	List<Barcodes> findAllBarcodes();
	Barcodes findById(Long id);
	Barcodes update(Barcodes barcodes) throws NotFoundException;
	Barcodes save(Barcodes newBarcode) throws NotFoundException;
}
