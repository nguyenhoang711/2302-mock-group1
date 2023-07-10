package com.vti.dto;

public class ChangePublicProfileDTO {

	// TODO validate
	private String avatarUrl;

	private String biography;

	public ChangePublicProfileDTO() {
	}

	public String getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getBiography() {
		return biography;
	}

	public void setBiography(String biography) {
		this.biography = biography;
	}

}
