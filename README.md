# IIT Kanpur Student Voting System

![Cover-Image](public\assets\voting-bg.png)

## Overview

The IIT Kanpur Student Voting System is designed to facilitate secure, safe, and easy voting for executive positions within the institute. This system ensures that only eligible students with valid IIT Kanpur credentials can participate in the voting process.

## Features

1. **Secure Authentication:**
   - Students can log in using their IIT Kanpur credentials to ensure the authenticity of voters.
   - Multi-factor authentication can be implemented for an additional layer of security.

2. **User-Friendly Interface:**
   - The system provides an intuitive and user-friendly interface, making it easy for students to cast their votes without any complications.

3. **Role-Based Access Control:**
   - Different executive positions are available for voting, and students can only vote for positions relevant to their academic year or department.

4. **Anonymous Voting:**
   - The system ensures the privacy of individual votes, maintaining anonymity in the election process.

5. **Secured Data Transmission:**
   - If you use OTP based authentication, your OTP is highly secured by hashing.

## How to Use

1. **Login:**
   - Visit the voting system website, hosted at vercel. https://elections-iitk.vercel.app/login
   - Log in using your IIT Kanpur credentials.

2. **Navigate to Voting Section:**
   - Once logged in, navigate to the voting section, where you will find the list of available executive positions.

3. **Vote:**
   - Select the candidate of your choice for each position.
   - Review your choices before submitting.

4. **Submit Vote:**
   - After confirming your selections, submit your vote.

5. **Logout from system:**
   - After submission, logout from system.

## Security Measures

1. **Encrypted Communication:**
   - SSL/TLS encryption is implemented to secure communication between the user's device and the server.

2. **Authorization Checks:**
   - Role-based access control ensures that users can only access and vote for positions for which they are eligible.

3. **Data Encryption:**
   - Stored voting data is encrypted to protect the integrity and confidentiality of the information.

## Admin Section

The IIT Kanpur Student Voting System includes an admin section, providing administrators with the ability to manage candidates, oversee the voting process, and generate election results.

### Features

1. **Candidate nominations:**
   - Admins can add candidates eligible for executive positions.
   - Candidate details, such as name, position, avatar, etc can be easily updated through the admin interface.

2. **Vote Counting:**
   - The admin section facilitates the counting of votes once the voting period concludes.
   - A secure and transparent vote counting mechanism ensures the accuracy of the election results.

3. **Result Generation:**
   - Admins have the capability to generate and publish election results.
   - Result summaries, including the number of votes each candidate received, are made available to the public after the counting process.

### How to Use Admin Section

1. **Login as Admin:**
   - Access the admin section by logging in with authorized administrative credentials, on https://elections-iitk.vercel.app/admin/login

2. **Candidate Management:**
   - Add new candidates with relevant details.

3. **Vote Counting:**
   - Initiate the vote counting process after the voting period concludes.
   - Verify and ensure the accuracy of the counted votes.

4. **Result Generation:**
   - Generate and publish election results through the admin interface.
   - Make the results accessible to all users, providing transparency in the election process.

### Security Measures

1. **Admin Authentication:**
   - Admin access is restricted to authorized personnel with unique and secure credentials.

3. **Data Integrity:**
   - All candidate and vote count data is stored securely and is protected against unauthorized modifications.


## Feedback and Support

For any issues, feedback, or support, please contact me
Sachida
navik09.me@gmail.com | sachidanan22@iitk.ac.in
