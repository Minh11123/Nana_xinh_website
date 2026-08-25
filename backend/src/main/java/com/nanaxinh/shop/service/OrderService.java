package com.nanaxinh.shop.service;

import com.nanaxinh.shop.dto.OrderDto;
import com.nanaxinh.shop.dto.OrderRequest;
import com.nanaxinh.shop.entity.Customer;
import com.nanaxinh.shop.entity.CustomerOrder;
import com.nanaxinh.shop.entity.OrderItem;
import com.nanaxinh.shop.entity.Product;
import com.nanaxinh.shop.repository.CustomerRepository;
import com.nanaxinh.shop.repository.OrderRepository;
import com.nanaxinh.shop.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
  private static final BigDecimal FREE_SHIP_THRESHOLD = new BigDecimal("500000");
  private static final BigDecimal DEFAULT_SHIPPING_FEE = new BigDecimal("30000");

  private final CustomerRepository customerRepository;
  private final OrderRepository orderRepository;
  private final ProductRepository productRepository;

  public OrderService(
      CustomerRepository customerRepository,
      OrderRepository orderRepository,
      ProductRepository productRepository
  ) {
    this.customerRepository = customerRepository;
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  @Transactional(readOnly = true)
  public List<OrderDto> listOrders() {
    return orderRepository.findAll().stream().map(this::toDto).toList();
  }

  @Transactional
  public OrderDto createOrder(OrderRequest request) {
    Customer customer = customerRepository.findByPhone(request.phone()).orElseGet(Customer::new);
    customer.setFullName(request.fullName());
    customer.setPhone(request.phone());
    customer.setEmail(request.email());
    customer.setAddress(request.address());
    customer = customerRepository.save(customer);

    CustomerOrder order = new CustomerOrder();
    order.setCustomer(customer);
    order.setRecipientName(request.fullName());
    order.setRecipientPhone(request.phone());
    order.setDeliveryAddress(request.address());
    order.setDeliveryDate(request.deliveryDate());
    order.setDeliveryTimeSlot(request.deliveryTimeSlot());
    order.setNote(request.note());

    BigDecimal subtotal = BigDecimal.ZERO;
    for (OrderRequest.Item requestItem : request.items()) {
      Product product = productRepository.findById(requestItem.productId())
          .orElseThrow(() -> new EntityNotFoundException("Product not found"));
      BigDecimal unitPrice = product.getSalePrice() == null ? product.getPrice() : product.getSalePrice();
      BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(requestItem.quantity()));

      OrderItem item = new OrderItem();
      item.setProduct(product);
      item.setProductName(product.getName());
      item.setUnitPrice(unitPrice);
      item.setQuantity(requestItem.quantity());
      item.setLineTotal(lineTotal);
      order.addItem(item);
      subtotal = subtotal.add(lineTotal);
    }

    BigDecimal shippingFee = subtotal.compareTo(FREE_SHIP_THRESHOLD) >= 0
        ? BigDecimal.ZERO
        : DEFAULT_SHIPPING_FEE;
    order.setSubtotal(subtotal);
    order.setShippingFee(shippingFee);
    order.setTotal(subtotal.add(shippingFee));

    return toDto(orderRepository.save(order));
  }

  private OrderDto toDto(CustomerOrder order) {
    return new OrderDto(
        order.getId(),
        order.getCustomer().getFullName(),
        order.getCustomer().getPhone(),
        order.getSubtotal(),
        order.getShippingFee(),
        order.getTotal(),
        order.getStatus(),
        order.getCreatedAt()
    );
  }
}
