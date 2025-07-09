package com.ss.service.usermanagement;

import com.ss.domain.usermanagement.SphericUser;
import com.ss.repository.usermanagement.SphericUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("SpringDataUserDetailsService")
public class SpringDataUserDetailsService implements UserDetailsService {

    @Autowired
    private SphericUserRepository sphericUserRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean isValidPassword(String rawPassword, String hash) {
        return passwordEncoder.matches(rawPassword, hash);
    }

    /*public SphericUser save(SphericUser registration){
        SphericUser user = new SphericUser();
        user.setFirstName(registration.getFirstName());
        user.setLastName(registration.getLastName());
        user.setEmail(registration.getEmail());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setRoles(Arrays.asList(new Role("ROLE_USER")));
        return sphericUserRepository.save(user);
    }*/

    @Override
    public UserDetails loadUserByUsername(String username) throws
            UsernameNotFoundException {
        List<SphericUser> usersList = sphericUserRepository.findByEmailAndIsActivatedTrueAndIsArchivedFalse(username.toLowerCase().trim());
        if (usersList == null || usersList.isEmpty())
            throw new UsernameNotFoundException(username + " not found");
        for (SphericUser userObj : usersList) {
            //System.out.println(userObj.getUsername()+": "+passwordEncoder.encode(userObj.getPassword()));
            if (userObj != null && !userObj.isArchived()) {
                /*UserRole userRole = userObj.getRole();
                String roleAsString = null;
                if(userRole != null && !userRole.isArchived())
                    roleAsString = userRole.getName();*/
                //User user = new User(userObj.getEmail().toLowerCase().trim(), userObj.getPassword(),AuthorityUtils.commaSeparatedStringToAuthorityList(roleAsString));
                User user = new User(userObj.getEmail().toLowerCase().trim(), userObj.getPassword(), new ArrayList<>());
                return user;
            }
        }

        throw new UsernameNotFoundException(username + " not found");
    }
}