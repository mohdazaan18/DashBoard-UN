/**
 * Frontend mirror of the backend GROUPS constant.
 * Country names MUST exactly match the UN CSV dataset strings.
 * Keep this in sync with backend/src/constants/groups.ts.
 */
export const GROUPS: Record<string, string[]> = {
    "Africa": [
        "Algeria", "Angola", "Benin", "Botswana", "British Indian Ocean Territory",
        "Burkina Faso", "Burundi", "Cameroon", "Cabo Verde", "Central African Republic",
        "Chad", "Comoros", "Côte d'Ivoire", "Democratic Republic of the Congo",
        "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
        "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast",
        "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali",
        "Mauritania", "Mauritius", "Mayotte", "Morocco", "Mozambique", "Namibia",
        "Niger", "Nigeria", "Congo", "Rwanda", "Réunion", "Saint Helena",
        "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
        "South Sudan", "Sudan", "Sao Tome and Principe", "United Republic of Tanzania",
        "Togo", "Tunisia", "Uganda", "Western Sahara", "Zambia", "Zimbabwe",
    ],
    "Oceania": [
        "American Samoa", "Australia", "Christmas Island", "Cocos (Keeling) Islands",
        "Cook Islands", "Fiji", "French Polynesia", "Guam", "Kiribati",
        "Marshall Islands", "Micronesia", "Nauru", "New Caledonia", "New Zealand",
        "Niue", "Norfolk Island", "Northern Mariana Islands", "Palau", "Papua New Guinea",
        "Pitcairn Islands", "Samoa", "Solomon Islands", "Tokelau", "Tonga", "Tuvalu",
        "Vanuatu", "Wallis and Futuna Islands",
    ],
    "Asia": [
        "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
        "Brunei Darussalam", "Cambodia", "China", "Georgia", "China, Hong Kong SAR",
        "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Israel", "Japan",
        "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic",
        "Lebanon", "China, Macao SAR", "Malaysia", "Maldives", "Mongolia", "Myanmar",
        "Nepal", "Dem. People's Republic of Korea", "Oman", "Pakistan",
        "State of Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore",
        "Republic of Korea", "Sri Lanka", "Syrian Arab Republic",
        "China, Taiwan Province of China", "Tajikistan", "Thailand", "Timor-Leste",
        "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Viet Nam", "Yemen",
    ],
    "Europe": [
        "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
        "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia",
        "Faroe Islands", "Finland", "France", "Germany", "Gibraltar", "Greece",
        "Guernsey", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy",
        "Jersey", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
        "Malta", "Republic of Moldova", "Monaco", "Montenegro", "Netherlands",
        "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
        "Russian Federation", "San Marino", "Serbia", "Slovakia", "Slovenia",
        "Spain", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Ukraine",
        "United Kingdom", "Holy See", "Åland Islands",
    ],
    "Americas": [
        "Anguilla", "Antigua and Barbuda", "Argentina", "Aruba", "Bahamas",
        "Barbados", "Belize", "Bermuda", "Bolivia (Plurinational State of)", "Brazil",
        "British Virgin Islands", "Canada", "Bonaire, Sint Eustatius and Saba",
        "Cayman Islands", "Chile", "Colombia", "Costa Rica", "Cuba", "Curaçao",
        "Dominica", "Dominican Republic", "Ecuador", "El Salvador",
        "Falkland Islands (Malvinas)", "French Guiana", "Greenland", "Grenada",
        "Guadeloupe", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica",
        "Martinique", "Mexico", "Montserrat", "Nicaragua", "Panama", "Paraguay",
        "Peru", "Puerto Rico", "Saint Barthélemy", "Saint Kitts and Nevis",
        "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines", "Sint Maarten (Dutch part)", "Suriname",
        "Trinidad and Tobago", "Turks and Caicos Islands", "United States of America",
        "United States Minor Outlying Islands", "United States Virgin Islands",
        "Uruguay", "Venezuela (Bolivarian Republic of)",
    ],
    "Antarctic": [
        "Antarctica", "Bouvet Island", "French Southern and Antarctic Lands",
        "Heard Island and McDonald Islands", "South Georgia",
    ],
};

export type GroupKey = keyof typeof GROUPS;
