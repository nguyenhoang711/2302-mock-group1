package com.vti.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.vti.dto.ChangePublicProfileDTO;
import com.vti.entity.RegistrationUserToken;
import com.vti.entity.ResetPasswordToken;
import com.vti.entity.User;
import com.vti.entity.UserStatus;
import com.vti.event.OnResetPasswordViaEmailEvent;
import com.vti.event.OnSendRegistrationUserConfirmViaEmailEvent;
import com.vti.repository.RegistrationUserTokenRepository;
import com.vti.repository.ResetPasswordTokenRepository;
import com.vti.repository.UserRepository;

@Component
@Transactional
public class UserService implements IUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RegistrationUserTokenRepository registrationUserTokenRepository;

	@Autowired
	private ResetPasswordTokenRepository resetPasswordTokenRepository;

	@Autowired
	private ApplicationEventPublisher eventPublisher;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void createUser(User user) {

		// encode password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// create user
		userRepository.save(user);

		// create new user registration token
		createNewRegistrationUserToken(user);

		// send email to confirm
		sendConfirmUserRegistrationViaEmail(user.getEmail());
	}

	private void createNewRegistrationUserToken(User user) {

		// create new token for confirm Registration
		final String newToken = UUID.randomUUID().toString();
		RegistrationUserToken token = new RegistrationUserToken(newToken, user);

		registrationUserTokenRepository.save(token);
	}

	@Override
	public void sendConfirmUserRegistrationViaEmail(String email) {
		eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(email));
	}

	@Override
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User findUserByUserName(String username) {
		return userRepository.findByUserName(username);
	}

	@Override
	public boolean existsUserByEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	public boolean existsUserByUserName(String userName) {
		return userRepository.existsByUserName(userName);
	}

	@Override
	public void activeUser(String token) {

		// get token
		RegistrationUserToken registrationUserToken = registrationUserTokenRepository.findByToken(token);

		// active user
		User user = registrationUserToken.getUser();
		user.setStatus(UserStatus.ACTIVE);
		userRepository.save(user);

		// remove Registration User Token
		registrationUserTokenRepository.deleteById(registrationUserToken.getId());
	}

	@Override
	public void resetPasswordViaEmail(String email) {

		// find user by email
		User user = findUserByEmail(email);

		// remove token token if exists
		resetPasswordTokenRepository.deleteByUserId(user.getId());

		// create new reset password token
		createNewResetPasswordToken(user);

		// send email
		sendResetPasswordViaEmail(email);
	}

	@Override
	public void sendResetPasswordViaEmail(String email) {
		eventPublisher.publishEvent(new OnResetPasswordViaEmailEvent(email));
	}

	private void createNewResetPasswordToken(User user) {

		// create new token for Reseting password
		final String newToken = UUID.randomUUID().toString();
		ResetPasswordToken token = new ResetPasswordToken(newToken, user);

		resetPasswordTokenRepository.save(token);
	}

	@Override
	public void resetPassword(String token, String newPassword) {
		// get token
		ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findByToken(token);

		// change password
		User user = resetPasswordToken.getUser();
		user.setPassword(passwordEncoder.encode(newPassword));
		userRepository.save(user);

		// remove Reset Password
		resetPasswordTokenRepository.deleteById(resetPasswordToken.getId());
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// Check user exists by username
		User user = userRepository.findByUserName(username);

		if (user == null) {
			throw new UsernameNotFoundException(username);
		}

		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRole()));
	}

	@Override
	public void changeUserProfile(String username, ChangePublicProfileDTO dto) {
		User user = userRepository.findByUserName(username);
		
		user.setAvatarUrl(dto.getAvatarUrl());
		userRepository.save(user);
		
		// TODO other field
	}

}
