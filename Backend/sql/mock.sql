
USE testingsystem;

-- them thong tin bang Tour
INSERT INTO `tour`(details,duration,`name`,numOfPeople,thumbnailUrl,img1_url,img2_url,img3_url,img4_url,price,startDest,saleRate,`type`) VALUES
('Ngày 1 - Săn Mây Cầu Đất - Cánh Đồng Điện Gió - Vườn Dâu - Vườn Hoa Cẩm Tú Cầu - Thưởng thức Trà Long Đỉnh','1 ngày', 'City Đà Lạt - Săn mây đón bình minh - Thưởng thức Trà Long Đình', 12,'DaLat_tour.jpg','','','','',790000,'Hà Nội',40,'STANDARD'),
('Nhân dịp kỷ niệm 30 năm Quần thể Di tích Cố đô Huế được UNESCO công nhận là Di sản Văn hóa Thế giới, 
20 năm Nhã nhạc được công nhận Di sản Văn hóa Phi vật thể đại diện của nhân loại, Festival Huế 2023 với Chủ đề:
 “Di sản Văn hóa với hội nhập và phát triển”', '4 ngày 3 đêm','KDL Bà Nà – Sơn Trà – Hội An - La Vang - Động Phong Nha – Làng hương Thủy Xuân - Huế',
 15,'BaNa_tour.jpg','','','','',8990000,'TP Hồ Chí Minh',0.0,'STANDARD'),
('Ngày 1 - TP HỒ CHÍ MINH - PHÚ QUỐC (Ăn chiều)
Quý khách tập trung tại Sân bay Tân Sơn Nhất, ga đi Trong Nước, hướng dẫn viên hỗ trợ làm thủ tục đáp chuyến bay đi Phú Quốc. Xe đón đoàn tại sân bay đưa Quý khách về nhận phòng tại khách sạn. Nghỉ đêm tại Phú Quốc.'
,'4 ngày 3 đêm','Phú Quốc - Thiên đường giải trí VinWonders - Vinpearl Safari - Hòn Thơm Nature Park - Cáp Treo Vượt Biển - Công Viên Nước Aquatopia'
,3, '','','','','',8990000,'TP. Hồ Chí Minh',0,'STANDARD');

INSERT INTO `Trip` (tourId, startDate, endDate, curatorName, hotel)
VALUES
(1, '2023-06-20', '2023-06-24', 'Nguyễn Văn A', 'Khách sạn 4*'),
(2, '2023-06-22', '2023-06-23', 'Nguyễn Thị B', 'Khách sạn 3*'),
(3, '2023-06-20', '2023-06-24', 'Nguyễn Văn C', 'Khách sạn 4*');

INSERT INTO `User` 	(`username`,			`email`,						`password`,														`firstName`,		`lastName`,		address,		phoneNumber, 	`status`, 	`role`)
VALUE				('hanh.havan@vti',		'hanhhanoi1999@gmail.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Hà'	,		'Văn Hanh',		'Ha Noi',		'0987654678',		1, 		'ADMIN' 	), 
					('thanhhung12@vti',		'hung122112@gmail.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Thanh Hưng',	'Ha Nam',		'0987884678',		1, 		'CUSTOMER' 	), 
					('can.tuananh@vti',		'cananh.tuan12@vti.com',		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Cấn'	,		'Tuấn Anh',		'Nam Dinh',		'0387654678',		1, 		'CUSTOMER'	), 
					('toananh123@vti',		'toananh123@vti.com',			'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn',		'Anh Toàn',		'Thai Binh',	'0887654678',		1, 		'EMPLOYEE' 	),
					('minhduc',			'minhduc@gmail.com',				'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',		'Nguyễn'	,	'Minh Đức',		'Ha Noi',		'0987654678',		1, 		'ADMIN' 	);

INSERT INTO `Booking` (tripId, userId, numOfPeople, totalPrice, details)
VALUES 
(1, 2, 10, 2000000, 'Không có'),
(2, 1, 5, 3000000, 'Không có'),
(3, 4, 8, 4000000, 'Không có');

select * from tour;
