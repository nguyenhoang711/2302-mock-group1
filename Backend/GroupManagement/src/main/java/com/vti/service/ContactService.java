package com.vti.service;

import com.vti.dto.contact.FormCreateContact;
import com.vti.dto.contact.FormUpdateContact;
import com.vti.entity.Contact;
import com.vti.repository.ContactRepository;
import com.vti.specification.GroupSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
public class ContactService implements IContactService{

    @Autowired
    private ContactRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<Contact> getAllContacts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public boolean isContactExistsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    public void createContact(FormCreateContact form) {
        // convert form to entity
        Contact contact = modelMapper.map(form, Contact.class);
        repository.save(contact);
    }

    @Override
    public Contact getContactByID(UUID id) {
        return repository.findById(id).get();
    }

    @Override
    public void updateContact(UUID id, FormUpdateContact form) {
        Contact contact = repository.findById(id).get();
        contact.setMessage(form.getMessage());
        contact.setFile_url(form.getFile_url());

        repository.save(contact);
    }

    @Override
    @Transactional
    public void deleteContacts(List<UUID> ids) {
        repository.deleteByIdIn(ids);
//        System.out.println("Hello");
    }
}
