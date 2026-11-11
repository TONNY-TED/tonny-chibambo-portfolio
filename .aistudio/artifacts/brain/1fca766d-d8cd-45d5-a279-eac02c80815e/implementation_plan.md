# Implementation Plan: Education & Professional Certifications Update

Update the **Education & Certifications** section of Tonny Chibambo's portfolio (`about.html`) with authentic degree pursuits, online institution coursework, secondary education, and 4 industry-recognized professional certifications.

---

## 1. Overview of Changes

### A. Degree Pursuits & Academic Education Table
- **BSc in Computer Science (Current)**: DMI-St. John the Baptist University (Period: `2024 – 2027`)
- **Data Science (Online Course)**: WorldQuant University (Period: `Current / Continuing`)
- **Secondary Education (MSCE)**: Alpha Private School (Period: `2020 – 2023`)

### B. Professional Certifications Showcase Cards
Create a dedicated, visually striking **Professional Certifications** card section with verified badges, issuing organizations, issue dates, and skill summaries:

1. **NVIDIA Certificate of Competency: Fundamentals of Accelerated Computing with CUDA C/C++**
   - **Issuer**: NVIDIA Deep Learning Institute
   - **Issue Date**: October 5, 2024
   - **Key Competencies**: GPU programming, CUDA tools for accelerating C/C++ applications, high-performance computing, data-intensive processing.

2. **Cisco Networking Academy Certificate: Introduction to Data Science**
   - **Issuer**: Cisco Networking Academy
   - **Issue Date**: February 15, 2025
   - **Key Competencies**: Foundational data science, Artificial Intelligence (AI) and Machine Learning (ML) role in developing intelligent systems and predictive models.

3. **Cisco Networking Academy Certificate: Introduction to Cybersecurity**
   - **Issuer**: Cisco Networking Academy
   - **Issue Date**: January 16, 2025
   - **Key Competencies**: Cybersecurity principles, cyber threats, vulnerabilities, attack vectors, risk management, essential security practices.

4. **Cisco Networking Academy Certificate: Networking Basics**
   - **Issuer**: Cisco Networking Academy
   - **Issue Date**: July 8, 2026
   - **Key Competencies**: Network topologies, IP addressing, Ethernet, network devices & protocols, wireless networking, basic troubleshooting.

---

## 2. File Updates Plan

| Target File | Changes Required |
| :--- | :--- |
| `/about.html` | • Update the Educational Background HTML table with WorldQuant University and DMI-St. John the Baptist University.<br>• Add a dedicated **Professional Certifications** card grid right below the education table.<br>• Add sub-nav tab link support for `#certs` if clicked. |
| `/css/style.css` | • Add styling rules for certification cards, verified issuer badges (`.cert-card`, `.cert-badge`, `.cert-issuer`), and date chips. |
| `/js/script.js` | • Ensure smooth scroll reveal animations apply to the newly added certification cards. |
| `/README.md` | • Update documented credentials and certifications in the portfolio guide. |
| `/public/` assets | • Sync updated CSS and JS into `public/` directory for Vite server execution. |

---

## 3. Verification Plan
- **Build & Lint**: Run `compile_applet` and `lint_applet` to ensure zero syntax or build errors.
- **HTTP Verification**: Run `curl` checks against `about.html` on port 3000 to verify all 4 certifications render correctly.
