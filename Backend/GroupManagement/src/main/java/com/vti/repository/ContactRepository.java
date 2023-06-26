package com.vti.repository;

import com.vti.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
    public boolean existsById(UUID id);

    public boolean existsByEmail(String email);

    public void deleteByIdIn(List<UUID> ids);
}
