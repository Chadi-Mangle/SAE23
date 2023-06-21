import json
from collections import OrderedDict

class FrequencyTable():
    """
    Classe qui permet d'avoir un objet de la fréquence d'un dictionaire
    """
    def __init__(self, text:str) -> None:
        self.text = text
        self.frequency_dictionary = {}

    def frequency(self)-> dict:
        for cara in self.text.lower(): 
            if cara not in self.frequency_dictionary.keys(): 
                self.frequency_dictionary[cara] = 1
            else:
                self.frequency_dictionary[cara] += 1
        for cara, occurrence in self.frequency_dictionary.items(): 
            self.frequency_dictionary[cara] = occurrence/len(self.text)
            self.frequency_dictionary = OrderedDict(sorted(self.frequency_dictionary.items(),
                                                           key=lambda t: t[1], reverse=True))
        return self.frequency_dictionary


class CreateFrequencyTable(FrequencyTable):
    """
    Classe qui permet de crée des tables de fréquences, elle hérite de FrequencyTable
    """
    def __init__(self, language_name_to_text) -> None:
        self.language_name_to_text = language_name_to_text
        self.language_frequency_dictionary = {}

    def create_table(self):
        for language_name, text in self.language_name_to_text.items(): 
            self.language_frequency_dictionary[language_name] = FrequencyTable(
                text.replace("\n", "").replace(" ", "")).frequency()

    def create_json_table(self, filename):
        self.create_table()
        file = open(filename, "w")
        file.write(json.dumps(self.language_frequency_dictionary, indent=4))
        file.close()

    def create_json_table_if_not_exists(self,filename):
        """
        Perrmet pas d'avoir a faire qu'une seul fois le calcule des tables de chaques langues
        """
        from os.path import exists
        if exists(filename) is False:
            self.create_json_table(filename)
            print(f"The file '{filename}' has been created successfully.")
        else:
            print(f"The file '{filename}' already exists.")

def user_frequency():
    """
    Fonction pour avoir la fréquence de l'utilisateur
    """
    text = input("Enter your text: ")
    user_language_frequency_dictionary = {}
    user_language_frequency_dictionary["user"] = FrequencyTable(text).frequency()

    return user_language_frequency_dictionary

def find_dict_with_default(dict, key, default):
    if key in dict.keys():
        return dict[key]
    return default

def distance_arithmetique(user:dict):
    square_of_distance = {}
    for language, dict_language in language_frequency_table.items():
        for dict_user in user.values():
            for u_letter, u_frequency in dict_user.items():
                freq_letter_language = find_dict_with_default(dict_language, u_letter, 0)
                if not language in square_of_distance.keys():
                    square_of_distance[language] = (freq_letter_language - u_frequency)**2
                else:
                    square_of_distance[language] += (freq_letter_language - u_frequency )**2

    return square_of_distance


if __name__ == "__main__":

    from language import language_name_to_text
    filename = "frequencytable.json"
    CreateFrequencyTable(language_name_to_text).create_json_table_if_not_exists(filename)
    f = open(filename, "r")

    user = user_frequency()

    language_frequency_table = json.load(f)

    distance = (sorted(distance_arithmetique(user).items(), key=lambda t: t[1]))

    print(f"""\nThis language appears to be {distance[0][0].capitalize()},
          but could very well be {distance[1][0].capitalize()} 
          or {distance[2][0].capitalize()} \n""")
    print(distance)