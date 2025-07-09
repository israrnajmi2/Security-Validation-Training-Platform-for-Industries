package com.ss.repository.perspective;

import com.ss.domain.perspective.CustomPerspective;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomPerspectiveRepository extends JpaRepository<CustomPerspective, Integer> {

    List<CustomPerspective> findByIsArchivedFalse();

    List<CustomPerspective> findByNameAndIsArchivedFalse(String name);
}
