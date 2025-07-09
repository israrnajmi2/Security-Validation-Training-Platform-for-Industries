package com.ss.repository.usermanagement;

import com.ss.domain.usermanagement.SphericUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SphericUserRepository extends JpaRepository<SphericUser, Integer> {

    List<SphericUser> findByEmailAndIsActivatedTrueAndIsArchivedFalse(String email);

}
