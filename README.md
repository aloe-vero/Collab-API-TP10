# Documentation API  
##titreClients
__Récupérer tous les clients__  
Requête  
GET http://localhost:3000/clients 
  
Réponse  
Status 200  

```
[  
    "/client/1",  
    "/client/2",  
    "/client/3"  
]
```  

__Récupérer un client spécifique (id)__  
Requête  
GET http://localhost:3000/client/1  
  
Réponse   
Status: 200  

```
{  
    "id": 1,  
    "prenom": "JEANNNNN",  
    "nom": "leGrand",  
    "tel": "123-456-7890",  
    "email": "jean@example.com"  
}
```  

__Créer un client__  
Requête  
POST http://localhost:3000/clients  
  
Réponse  
Status: 201 
```
{  
    "message": "Client ajouté avec succès",  
    "client": {  
        "id": 4,  
        "prenom": "Émilie",  
        "nom": "Albert-Moisan",  
        "tel": "514-123-4567",  
        "email": "emilie@example.com"  
    }  
}
```

__Modifier les données d'un client__  
Requête  
PUT http://localhost:3000/client/4  
  
Réponse  
Status: 200  

```
{  
    "message": "Client mis à jour avec succès",  
    "client": {  
        "id": 4,  
        "prenom": "Émilie",  
        "nom": "Vachon-Mendoza",  
        "tel": "514-123-4567",  
        "email": "emilie@example.com"  
    }  
}
```  
-----------------  
__Récupérer tous les spécialistes__  
Requête  
GET http://localhost:3000/specialistes  
  
Réponse  
Status: 200  

```
[  
    "/specialistes/1",  
    "/specialistes/2",  
    "/specialistes/3"  
]
```

__Récupérer un specialiste spécifique__ (id)  
Requête  
GET http://localhost:3000/specialiste/1  
  
Réponse  
Status: 200  

```
{  
    "id": 1,  
    "nom": "Albert-Moisan",  
    "prenom": "Émilie"  
}
```  
-----------------  
__Récupérer toutes les réservations__  
Requête  
GET http://localhost:3000/reservations  
  
Réponse  
Status: 200  

```
[  
    "/reservation/1",  
    "/reservation/2",  
    "/reservation/3"  
]
```

__Récupérer une réservation spécifique (id)__  
Requête  
GET http://localhost:3000/reservation/1  
  
Réponse  
Status: 200  

```
{  
    "id": 1,  
    "soin": "Haircut",  
    "date": "20 octobre 2024",  
    "specialisteId": 2,  
    "clientId": 3  
}
```

__Création d’une réservation__  
Requête  
POST http://localhost:3000/reservations  
  
Réponse  
Status: 201  

```
{  
    "message": "Réservation ajoutée avec succès",  
    "reservation": {  
        "id": 4,  
        "soin": "Pedicure",  
        "date": "23  janvier 2025",  
        "specialisteId": 3,  
        "clientId": 11  
    }  
}
```

__Modification d’une réservation__  
Requête  
PUT http://localhost:3000/reservation/2  
  
Réponse  
Status: 200  
```
{  
    "message": "Reservation mise à jour avec succès",  
    "reservation": {  
        "id": 2,  
        "soin": "À la chauve",  
        "date": "23  décembre 2025",  
        "specialisteId": 4,  
        "clientId": 5  
    }  
}
```

__Annuler une réservation__  
Requête  
DELETE http://localhost:3000/reservation/1  
  
Réponse  
Status: 200  

```
{  
    "message": "Réservation supprimée avec succès",  
    "deletedReservation": [  
        {  
            "id": 1,  
            "soin": "Haircut",  
            "date": "20 octobre 2024",  
            "specialisteId": 2,  
            "clientId": 3  
        }  
    ]  
}
```
