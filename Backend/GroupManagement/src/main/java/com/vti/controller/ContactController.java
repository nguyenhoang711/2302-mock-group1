package com.vti.controller;

import com.vti.dto.contact.FormCreateContact;
import com.vti.dto.contact.FormUpdateContact;
import com.vti.entity.Contact;
import com.vti.service.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    @Autowired
    private IContactService service;

    @GetMapping()
    public ResponseEntity<?> getAllContacts(Pageable pageable) {
        Page<Contact> entities = service.getAllContacts(pageable);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getContactByID(@PathVariable(name = "id") UUID id) {
        return new ResponseEntity<>(service.getContactByID(id), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> createContact(@RequestBody FormCreateContact form) {
        service.createContact(form);
        return new ResponseEntity<String>("Create contact successfully!", HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateContact(@PathVariable(name = "id") UUID id, @RequestBody FormUpdateContact form) {
        service.updateContact(id, form);
        return new ResponseEntity<String>("Update contact successfully!", HttpStatus.OK);
    }
}
