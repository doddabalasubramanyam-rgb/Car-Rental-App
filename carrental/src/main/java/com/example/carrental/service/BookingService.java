package com.example.carrental.service;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.carrental.entity.Booking;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.BookingRepository;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.UserRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          CarRepository carRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    // =============================
    // BOOK CAR
    // =============================
    public Booking bookCar(Long userId, Long carId, Booking bookingRequest) {

        // 1️⃣ Check User
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Check Car
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        // 3️⃣ Check Availability
        if (!car.isAvailable()) {
            throw new RuntimeException("Car is not available");
        }

        // 4️⃣ Validate Dates
        if (bookingRequest.getStartDate() == null ||
            bookingRequest.getEndDate() == null) {
            throw new RuntimeException("Booking dates cannot be null");
        }

        long days = ChronoUnit.DAYS.between(
                bookingRequest.getStartDate(),
                bookingRequest.getEndDate()
        );

        if (days <= 0) {
            throw new RuntimeException("Invalid booking dates");
        }

        // 5️⃣ Calculate Total Price
        double totalPrice = days * car.getPricePerDay();

        // 6️⃣ Set Booking Data
        bookingRequest.setUser(user);
        bookingRequest.setCar(car);
        bookingRequest.setTotalPrice(totalPrice);
        bookingRequest.setStatus("CONFIRMED");

        // 7️⃣ Mark Car Unavailable
        car.setAvailable(false);
        carRepository.save(car);

        // 8️⃣ Save Booking
        return bookingRepository.save(bookingRequest);
    }

    // =============================
    // GET USER BOOKINGS
    // =============================
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}