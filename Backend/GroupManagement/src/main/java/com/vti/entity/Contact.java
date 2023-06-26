package com.vti.entity;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
@Table(name = "contact")
public class Contact implements Serializable {
	private static final long serialVersionID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	@Type(type = "uuid-char")
	private UUID id;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "message", nullable = false, length = 600)
	private String message;

	@Column(name = "file_url", nullable = false)
	private String attachmentUrl;

	public Contact() {
	}

	public Contact(String email, String message, String attachmentUrl) {
		this.email = email;
		this.message = message;
		this.attachmentUrl = attachmentUrl;
	}
}
