package com.vti.dto.contact;

import lombok.Data;

@Data
public class FormCreateContact {
    private String email;

    private String message;

    private String file_url;
}
