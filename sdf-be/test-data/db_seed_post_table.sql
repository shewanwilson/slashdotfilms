TRUNCATE TABLE sdf_db.post;

INSERT INTO sdf_db.post (post_title, post_body, post_author) VALUES
("The Targaryen Dynasty", "The Targaryens are one of the most well-known families in Westeros, originally from the Valyrian Freehold. They ruled the Seven Kingdoms for nearly three centuries, with their dragons providing a distinct advantage over their enemies.", 0010),
("Jon Snow's True Parentage", "Jon Snow, raised as Eddard Stark's bastard, is later revealed to have a hidden parentage tied to the Targaryen line. This revelation changes the course of the War of the Five Kings and has significant implications for the Iron Throne.", 0020),
("The Red Wedding", "The Red Wedding was a tragic event in Westeros history where many key characters were murdered in a brutal betrayal at the hands of House Frey. This event marked a turning point in the War of the Five Kings.", 303),
("The Wall and the Night's Watch", "The Wall is an immense structure built to protect the realm from dangers beyond. The Night's Watch, tasked with guarding it, has been a symbol of honor and sacrifice, though it is often undermanned and disregarded by the political powers of Westeros.", 0040),
("The Dothraki and Their Culture", "The Dothraki are a fierce nomadic people known for their cavalry and horse-riding skills. They follow the Great Stallion and have a unique culture, centered around strength, honor, and the belief that a man’s worth is tied to the horses he owns.", 0050),
("Brienne of Tarth and Her Honor", "Brienne of Tarth is known as the Maid of Tarth and is one of the few women in Westeros who takes up the sword as a knight. Her dedication to her oath and her sense of honor make her a standout character in the series.", 0060),
("The War of the Five Kings", "The War of the Five Kings was a civil war in Westeros following the death of King Robert Baratheon. The main claimants were King Stannis Baratheon, King Renly Baratheon, Robb Stark, Joffrey Baratheon, and Balon Greyjoy.", 0070),
("Varys and His Spies", "Varys, the spymaster of Westeros, has a vast network of informants, which he uses to manipulate the political landscape. His enigmatic nature and loyalty to the realm make him both a fascinating and mysterious character.", 0080),
("Daenerys Targaryen's Rise to Power", "Daenerys Targaryen, the last surviving Targaryen after the fall of her house, begins her journey in Essos with nothing but a few followers. Over time, she gains an army, dragons, and the loyalty of many, setting her sights on the Iron Throne.", 0090),
("The Battle of the Bastards", "The Battle of the Bastards was a pivotal conflict in the North, where Jon Snow and Sansa Stark led their forces against Ramsay Bolton in an attempt to reclaim Winterfell. The battle is known for its brutal tactics and its impact on the Stark family’s future.", 0100);

SELECT * FROM sdf_db.post
