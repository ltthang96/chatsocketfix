-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 10, 2017 lúc 03:35 PM
-- Phiên bản máy phục vụ: 10.1.25-MariaDB
-- Phiên bản PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fisrt_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_password`, `user_email`, `fisrt_name`, `last_name`, `create_date`) VALUES
(18, 'sach2', '$2a$10$yjGBaZBihz.bwcIOXsAjf.lTu2bXJYx4i1w7jKOXjW1HtAatVX79a', 'sach@gmail.com', 'Sách', 'Trần', '2017-09-30 13:14:54'),
(19, 'sach23', '$2a$10$9cTpU3Xlh2aLSYxQEOosWeF9LmTxUJp5Vip78rMjVdm9S7hz2BYs6', 'sach@gmail.com', 'Sách', 'Trần', '2017-09-30 13:39:00'),
(20, 'qqqqq', '$2a$10$9cTpU3Xlh2aLSYxQEOosWeF9LmTxUJp5Vip78rMjVdm9S7hz2BYs6', 'ẻ', 'ưẻw', 'ưẻ', '2017-09-30 13:40:01'),
(21, '12321', '$2a$10$sf3c7HXdwAtdP8vUAJY1V.cbAqQ8fRVqBAZx9XUJGXXAjwoBuxu5q', 'qư', 'qưeq', 'qưe', '2017-09-30 13:40:47'),
(22, '123213', '$2a$10$sf3c7HXdwAtdP8vUAJY1V.cbAqQ8fRVqBAZx9XUJGXXAjwoBuxu5q', 'qư', 'qưeq', 'qưe', '2017-09-30 13:40:58'),
(23, '1232131', '$2a$10$W6rCxOg90pUROJyx.oikUeXBbemHFy3Dc.l3RKQUl6xbNJjokohmW', 'qư', 'qưeq', 'qưe', '2017-09-30 13:41:13'),
(24, '123', '$2a$10$0iukdH3m0YR1dBfXZToXUeHsGqBNQXZIJBGNlc/nlbD/Qr02MitkW', 'ửẻ', 'qưeqưeq', 'qưewqe', '2017-09-30 13:52:35'),
(25, '1233', '$2a$10$wH8R/fvzT1YwIA0AMtg2j.9f0W/fKGMmGDGqm1qKSmdJHEssEXOFG', '123', '123213', '123', '2017-09-30 13:54:19'),
(27, '4443', '$2a$10$J/.NqYMmAJB5ZtjcYxpvaeAetqZ1hW/XQzTG2SIVWtsbJ8liTJ3pC', 'qư', 'qưe', 'qưe', '2017-09-30 14:08:06'),
(28, '1234', '$2a$10$Prkwi4n5iDEUTOwBg6QF8O/TzhIGKzuCFOfy3iip13puNQE/ok83e', 'qwe@gmail.com', 'qwe', 'werwer', '2017-09-30 14:19:11'),
(29, 'thang', '$2a$10$BvakOyxrh6/2Ge7noIEdE.vSl.CKU4PttxzHbvflFpj7OXt76aLXq', 'undefined', 'Lục', 'Thắng', '2017-09-30 14:30:17'),
(30, 'thanh', '$2a$10$2xtzidNwlRoRunBxrVv4rOove13uQhYfDnbiwm5Cp/JVCNpN9i53u', 'aqq@gmail.com', 'Nguyễn', 'Thành', '2017-09-30 14:43:03'),
(31, 'thien', '$2a$10$u31JbptXf5ikrmo0nh48L.u4orbzaJRRRR6Xxh.gtvX.3cnlhKziu', 'thien@gmail.com', 'thien', 'tran', '2017-10-12 15:34:24'),
(32, 'thang12', '$2a$10$2xtzidNwlRoRunBxrVv4rOove13uQhYfDnbiwm5Cp/JVCNpN9i53u', 'ádlă@gmail.com', 'Thắng', 'Lục', '2017-11-09 16:16:07'),
(33, 'thien123', '$2a$10$2xtzidNwlRoRunBxrVv4rOove13uQhYfDnbiwm5Cp/JVCNpN9i53u', 'qwe@gmail.com', 'thang', 'luc', '2017-11-10 18:00:15');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
