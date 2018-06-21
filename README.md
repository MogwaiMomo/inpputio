#Getting Started:

Check to see if an instance is already running by typing: 
$ ps ax | grep mongod

To shut down a previously running mongod instance: 
$ mongo
$ use admin
$ db.shutdownServer()

Set up a mongod instance: 
$ mongod (if not programmed to auto-run) 

To run the app locally, type:
$ DEBUG=inpputio npm start


# TO DO

<<<<<<< HEAD
1. Refresh with blank slate page after deleting files. 

2. Enable ability to add additional files.

3. Make campaigns page refresh with updated files 
    after deleting file. 
=======
1. Make campaigns page refresh with updated files 
    after deleting file: NEED TO DELETE 'CAMPAIGNS' from accounts view data input for this to work. 
>>>>>>> refresh-blank
    
4. Render all multiple campaign files, not just one.



# MVP TASK FLOW: 
   - upload CSV of long-form response survey data
   - do sentence clustering for each question (make sure each sentence is ID'ed by user)
   - count # of unique IDs per cluster (i.e. how many individuals talk about this?)
   - create text blurb for each cluster
   - choose topic per cluster/blurb
   - sentiment analysis per cluster/blurb
     

