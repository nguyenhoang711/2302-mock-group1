package com.vti.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDTO implements Serializable{
	private String status;
	private String message;
	private String url;
	
	
}
