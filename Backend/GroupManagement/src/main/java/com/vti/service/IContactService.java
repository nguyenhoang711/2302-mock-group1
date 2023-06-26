package com.vti.service;

import com.vti.dto.contact.FormCreateContact;
import com.vti.dto.contact.FormUpdateContact;
import com.vti.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IContactService {

    Page<Contact> getAllContacts(Pageable pageable);

    boolean isContactExistsByEmail(String email);

    void createContact(FormCreateContact form);

    Contact getContactByID(UUID id);

    void updateContact(UUID id, FormUpdateContact form);

    void deleteContacts(List<UUID> ids);
}
