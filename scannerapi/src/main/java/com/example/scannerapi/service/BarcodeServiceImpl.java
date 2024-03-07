package com.example.scannerapi.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.example.scannerapi.model.Barcodes;
import com.example.scannerapi.repository.BarcodeRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class BarcodeServiceImpl implements BarcodeService {
	private static final Logger logger = LoggerFactory.getLogger(BarcodeServiceImpl.class);
	
	@Autowired
    private BarcodeRepository repository; 

	@Override
	public List<Barcodes> findAllBarcodes() {
		return (List<Barcodes>) repository.findAll();
	}
	 
	@Override
	public List<Barcodes> findByBarcode(long barcode) {
		return repository.findByBarcode(barcode);
	}
	
	@Override
	public Barcodes findById(Long id) {
		return repository.findById(id).get();
	}

	@Override
	public Barcodes update(Barcodes barcodes) throws NotFoundException {
		Barcodes toUpdate = findById(barcodes.getID());
		if(toUpdate == null)
			throw new NotFoundException();
		toUpdate = repository.save(barcodes);
		return toUpdate;
	}

	@Override
	public Barcodes save(Barcodes newBarcode) throws NotFoundException {
		if(newBarcode != null && !StringUtils.isEmpty(String.valueOf(newBarcode.getBarcode()))
				&& newBarcode.getBarcode() !=0 ) {
			return repository.save(newBarcode);
		}
		else {
			logger.info("newBarcode was null");
			//TODO: Change it with another proper exception to send to the app
			throw new NotFoundException();
			//return null;
		}
	}

}
