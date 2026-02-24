package com.example.carrental.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.carrental.entity.Car;
import com.example.carrental.repository.CarRepository;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Long id, Car car) {
        Car existing = carRepository.findById(id).orElseThrow();

        existing.setBrand(car.getBrand());
        existing.setModel(car.getModel());
        existing.setPricePerDay(car.getPricePerDay());
        existing.setAvailable(car.isAvailable());

        return carRepository.save(existing);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}