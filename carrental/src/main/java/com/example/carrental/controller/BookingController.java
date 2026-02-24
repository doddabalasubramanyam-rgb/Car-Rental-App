package com.example.carrental.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.carrental.entity.Booking;
import com.example.carrental.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{userId}/{carId}")
    public Booking bookCar(@PathVariable Long userId,
                           @PathVariable Long carId,
                           @RequestBody Booking bookingRequest) {
        return bookingService.bookCar(userId, carId, bookingRequest);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }
}