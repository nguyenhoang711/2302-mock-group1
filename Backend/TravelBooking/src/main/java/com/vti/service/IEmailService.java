package com.vti.service;

public interface IEmailService {

	void sendRegistrationUserConfirm(String email);

	void sendResetPassword(String email);

	void sendConfirmBookingTour(String email, short id);

}
