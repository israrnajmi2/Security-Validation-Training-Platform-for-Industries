package com.ss.repository.parametertree;

import com.ss.domain.parametertree.SubjectParameterWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectParameterWordRepository extends JpaRepository<SubjectParameterWord, Integer> {
    List<SubjectParameterWord> findByLevelAndIsArchivedFalse(Integer level);

    List<SubjectParameterWord> findByWordAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM SubjectParameterWord at WHERE isArchived = false")
    Integer getMaxLevel();
}
