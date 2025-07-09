package com.ss.repository.usermanagement;

import com.ss.domain.usermanagement.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

    UserRole findByNameAndIsArchivedFalse(String name);

}
