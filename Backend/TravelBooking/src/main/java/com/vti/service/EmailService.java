package com.vti.service;

import com.vti.entity.Booking;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import com.vti.entity.User;
import com.vti.repository.RegistrationUserTokenRepository;
import com.vti.repository.ResetPasswordTokenRepository;

@Component
public class EmailService implements IEmailService {

	@Autowired
	private IUserService userService;

	@Autowired
	private IBookingService bookingService;

	@Autowired
	private RegistrationUserTokenRepository registrationUserTokenRepository;

	@Autowired
	private ResetPasswordTokenRepository resetPasswordTokenRepository;

	@Autowired
	private JavaMailSender mailSender;

	@Override
	public void sendRegistrationUserConfirm(String email) {

		User user = userService.findUserByEmail(email);

		String token = registrationUserTokenRepository.findByUserId(user.getId());

		String confirmationUrl = "http://localhost:8080/api/v1/users/activeUser?token=" + token;

		String subject = "Xác Nhận Đăng Ký Account";
		String content = "Bạn đã đăng ký thành công. Click vào link dưới đây để kích hoạt tài khoản \n"
				+ confirmationUrl;

		sendEmail(email, subject, content);
	}

	@Override
	public void sendResetPassword(String email) {

		User user = userService.findUserByEmail(email);
		String token = resetPasswordTokenRepository.findByUserId(user.getId());

		String confirmationUrl = "http://localhost:3000/auth/new-password/" + token;

		String subject = "Thiết lập lại mật khẩu";
		String content = "Click vào link dưới đây để thiết lập lại mật khẩu (nếu không phải bạn xin vui lòng bỏ qua).\n"
				+ confirmationUrl;

		sendEmail(email, subject, content);
	}

	@Override
	public void sendConfirmBookingTour(String email, short id){
		Booking booking = bookingService.getBookingByID(id);
		String tourName = booking.getTrip().getTour().getName();
		int bookingId = id;
		int totalPrice = booking.getTotalPrice();
		DecimalFormat decimalFormat = new DecimalFormat("#,###");
		String priceFormat = decimalFormat.format(totalPrice).replace(".", ",") + "đ";
		int numOfPeople = booking.getNumOfPeople();
		Date startDate = booking.getTrip().getStartDate();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String startDateFormat = formatter.format(startDate);
		String bookingStatus = booking.getBookingStatus();
//		String url = String.format("http://localhost:3000/showCustomerInfo?bookingId=%d&totalPrice=%d", id, price);
		String subject = "Xác nhận đặt tour thành công!";
		String content = "Bạn đã đặt thành công tour du lịch \"" + tourName + "\". " + "\nMã booking: " + bookingId + "\nNgày đi: " + startDateFormat
							+ "\nSố lượng người tham gia: " + numOfPeople + "\nTổng tiền: " + priceFormat + "\nTrạng thái: " + bookingStatus;
		sendEmail(email, subject, content);
	}

		private void sendEmail(final String recipientEmail, final String subject, final String content) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(recipientEmail);
			message.setSubject(subject);
			message.setText(content);
			mailSender.send(message);
	}

}
