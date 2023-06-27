package com.vti.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.vti.service.IFileService;
import com.vti.utils.FileManager;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/files")
@Validated
public class FileController {

	@Autowired
	private IFileService fileService;

	@Value("${myapp.image-folder}")
	private String folderLink;

	@GetMapping("/images/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {

		String imagePath = folderLink + "/" + imageName; // Replace with the actual path

		File file = new File(imagePath);

		if (!file.exists()) {
			return ResponseEntity.notFound().build();
		}

		// Read the image data into a byte array
		byte[] imageData = Files.readAllBytes(Paths.get(imagePath));

		// Set the content type header based on the image file type
		String contentType = Files.probeContentType(file.toPath());
		if (contentType == null) {
			contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
		}

		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(imageData);
	}

//	@GetMapping(value = "/image/{filename}")
//	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//
//		// Load the file as a Resource
//		Resource fileResource = fileService.getImage(filename);
//
//		// Check if the file exists
//		if (fileResource.exists()) {
//			return ResponseEntity.ok()
//					.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
//					.body(fileResource);
//		} else {
//			// File not found, return an appropriate response
//			return ResponseEntity.notFound().build();
//		}
//	}


	@PostMapping(value = "/image")
	public ResponseEntity<?> upLoadImage(@RequestParam(name = "image") MultipartFile image) throws IOException {

		if (!new FileManager().isTypeFileImage(image)) {
			return new ResponseEntity<>("File must be image!", HttpStatus.UNPROCESSABLE_ENTITY);
		}
		
		return new ResponseEntity<>(fileService.uploadImage(image), HttpStatus.OK);
	}

	//add new product
	@PostMapping(value = "/product")
	public ResponseEntity<?> upLoadProduct(@RequestParam(name = "image") MultipartFile image,
										 @RequestParam(name = "name") String name) throws IOException {

		if (!new FileManager().isTypeFileImage(image)) {
			return new ResponseEntity<>("File must be image!", HttpStatus.UNPROCESSABLE_ENTITY);
		}

		//lay duong dan den anh luu tru
		String imageLink = fileService.uploadImage(image);

		System.out.println("name: " + name + ", imageLink: " + imageLink);

		return new ResponseEntity<>(fileService.uploadImage(image), HttpStatus.OK);
	}
}
