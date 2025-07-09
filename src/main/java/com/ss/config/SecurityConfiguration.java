package com.ss.config;

import com.ss.service.usermanagement.SpringDataUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfiguration extends
        WebSecurityConfigurerAdapter {

    @Autowired
    private SpringDataUserDetailsService springDataUserDetailsService;

    /*@Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth,
                                  SpringDataUserDetailsService userDetailsService)
            throws Exception {
        auth.userDetailsService(userDetailsService);
        auth.
    }*/

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(springDataUserDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }
    /*@Bean
    CommandLineRunner initializeUsers(SphericUserRepository repository) {
        return args -> {
            SphericUser user = new SphericUser();
            user.setUsername("greg");
            user.setPassword("password");
            repository.save(user);
            SphericUser user1 = new SphericUser();
            user1.setUsername("phil");
            user1.setPassword("password1");
            repository.save(new SphericUser(null, "phil", "webb",
                    new String[]{"ROLE_USER"}));
        };
    }*/

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*http.csrf().disable()
                .httpBasic()
                .and()
                .formLogin()
                .and()
                .authorizeRequests()
                .antMatchers("/**").authenticated();*/
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/fonts/**", "/createAdminUser.html",
                        "/rest/users_roles/can_show_create_first_user",
                        "/rest/users_roles/create_first_admin_user").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login").defaultSuccessUrl("/index.html", true)
                .permitAll()
                .and()
                .logout()
                .permitAll();
    }
}