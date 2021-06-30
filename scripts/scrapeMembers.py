import discum 
import os
import sys

# Login details, guild ID + channel ID 

acc_email = sys.argv[3]
acc_passw = sys.argv[4]

bot = discum.Client(email=acc_email, password=acc_passw, user_agent="random", log=False)
guild_i = sys.argv[1]
channel_i = sys.argv[2]

# Fetch members via gateway (bypass API)
@bot.gateway.command
def getMembers(resp):
	if resp.event.ready_supplemental:
		bot.gateway.fetchMembers(guild_i, channel_i)
	if bot.gateway.finishedMemberFetching(guild_i):
		bot.gateway.removeCommand(getMembers)
		bot.gateway.close()

# Grab list of member IDs from gateway session data
bot.gateway.run(auto_reconnect=True)
member = (bot.gateway.session.guild(guild_i).members)

# Put it all in a nifty little file <3
if os.path.exists("./temp_data/users.txt"):
	os.remove("./temp_data/users.txt")
file = open("./temp_data/users.txt", "a+")
for m in member:
	file.write(m + "\n")
file.close()
