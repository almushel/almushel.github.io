# Rhetorical Sound Design

Hearing is weird. It's abstract in a way that sight isn't. A picture can clearly communicate a sense of size
and space. A series of pictures can communicate speed and distance. Sound is only movement. Almost any
movement. It's the vibrations people and things make when they pass through the air and come into
contact with each other.

Hearing is also different from sight in part because we have less control over what we hear. We dont open and
close our ears, though we can try to block them. We don't really focus our ears in the way that we do
our eyes. We're always hearing (as long as we are able to), and so we often become so used to sound
that we don't actively notice it unless we make the effort. We learn to tune a lot of sounds out, but
instinctually notice when they are absent.

I think this is why sound design often goes unnoticed unless it is so incongruent that it breaks the
audience's immersion. Effective sound design sells the argument that what they are seeing with their eyes is
real. It reinforces all of the concrete information about size, space, and action that they see on a screen.
It is simply expected to be there and to sound "right."

For that reason, it can be useful to have certain heuristics to apply to this problem; the problem of making
things sound "right." I'm loosely adapting Aristotle's main rhetorical appeals—logos, ethos, and
pathos—as a framework for thinking about effective sound design, with a particular focus on game audio.
There is overlap between these appeals, because they are all fundamentally related (emotion and logic are
never truly separate) and because each sound effect is essentially its own argument that should ideally
succeed on multiple levels.

## Pathos: The Emotional Appeal

An important function of any synchronized or reactive audio is to reinforce the emotional experience of the
scene. This is where the role and function of sound design overlaps most with that of the musical score.
Does an impact <em>feel</em> big? Does the gun the player is firing <em>feel</em> powerful? Does the giant
monster they're fighting <em>feel</em> enormous and deadly? Does that abandoned mansion <em>feel</em>
haunted? This is the visceral, &#8220;game feel&#8221; component of game sound effects.</p>

This has important implications for game design. Emotionally satisfying audio cues influence player behavior
in a variety of ways.

* A feeling of constant or impending danger can make players play slower and more cautiously.
* A powerful-sounding weapon can inspire confidence and encourage players to be more aggressively.
* A weak-sounding weapon might be used less often, regardless of its practical functionality.

Zander Hulme told a relevant story along these lines at a panel at PAX Aus 2016 about multiplayer weapon
sound effects in a Wolfenstein game.

<iframe
	src="https://clips.twitch.tv/embed?clip=SpeedyClumsySlothUWot&amp;autoplay=false&amp;tt_medium=clips_embed"
	width="100%" height="360" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen" style="max-width: 640px;"
></iframe>

The players with the weaker-sounding weapon believed they were at a disadvantage and performed worse, despite
both teams having functionally identical weapons. Replacing the weaker sound effects with something more
satisfying fixed the perceived weapon imbalance. Game audio doesn't simply play a passive support role
in game design.

## Logos: The Logical Appeal

Another important function in game audio in particular is the ability to communicate factual information to
the audience. What exactly is making the sound? What direction is the sound coming from? From how far away?
In what kind of space? Is the audience in that space or a different space? Can your audience discern all of
these things or are they intended to? Lack of clarity and focus should be an intentional choice, not the
result of carelessness or oversight.

Much like the emotional appeal, this too is a practical game design consideration. Audio information provided
to the player can directly influence their decision-making and behavior in the game space, in a wide variety
of contexts.

* The recognizable sound of an enemy charging a powerful attack helps the player discern when to evade.
* The distinct sound of a sniper rifle being fired makes them reconsider peeking around a corner.
* The suddenly loud crack of their foot-steps on a tile floor tells them that sneaking will be difficult
and may require them to slow down.
* The clarity, volume, and propagation of sounds in competitive multiplayer games can significantly impact
what kind of information players have about strategies of their opponents, even without line of sight.

In Counter-Strike, for example, players have to be mindful of moving at full speed, because running foot
steps and jump landings can give away valuable information to their opponents with hearing and inform
counter strategies. At the same time, being aware of this fact allows players to intentionally make noise to
create misinformation.

Below is a clip of a CS:GO streamer, DaZeD, faking a drop by jumping on the ledge above. The opposing players
throw a flash grenade and attempt to retake the room, expecting him to be below and blinded, but they
don't predict his superior positioning and lose the fight.

<iframe
	src="https://clips.twitch.tv/embed?clip=SpoopyWanderingGooseKappaRoss&amp;autoplay=false&amp;tt_medium=clips_embed"
	width="100%" height="360" frameborder="0" scrolling="no" allowfullscreen="allowfullscreen" style="max-width: 640px;"
></iframe>

This only works because both teams are aware of the landing sounds and because these sounds are audible from
positions outside of the room.

A subsequent update added unique landing sounds per surface, which complicates this scenario. In this clip,
he actually jumps on a wood surface at the end of the upper tunnel. Now, an observant player could note that
this surface sound effect is not what would they would hear when opposing players drop on the stone floor
below. If he instead faked further to the left, the sounds would match as they did on older versions of the
game.
	
Sound effects can provide extremely valuable information to players beyond the limitations of line of sight.
It's important to keep this in mind, even for members of the development team who don't deal
directly with audio. If footstep propagation distance determines when and where players can afford to move
at full speed, this can influence how major routes through the map are designed. If this isn't
accounted for, it can have unintended consequences on player behavior and map flow. This applies in many
other seemingly non-audio design contexts as well.

## Ethos: The Appeal to Character

In the context of sound design, it's useful to think of ethos as authenticity. Does the audience accept that
this sound belongs in the space? Does it fit the art direction of the game? What stylistic considerations
must be made to ensure that is the case? If the game is heavily stylized, there is plenty of room for
stylized sound effects. If the game strives for pseudo-realism and photo-realistic graphics, it is probably
appropriate to keep the sound effects relatively grounded. Often, however, what the audience expects is very
different from reality. Authenticity is what it seems like something should sound like, rather than
necessarily what it actually does.

Practically, this has a large degree of overlap with Pathos, the emotional appeal, in that the most
emotionally resonant sounds should also be authentic, but they are distinct. An ambience could be suitably
unsettling, but not feel authentic in the wrong space. Creaking wood and howling wind might suit a creepy,
old house, but be very much out of place in an abandoned space station, even though both evoke a lonely,
isolated atmosphere. An impact could be distinct and punchy, but not fit the style of the game or the source
object or actor.

## Conclusion

A very common example of all of these elements in action is in effective gun shot sound effects, particularly
for real world weapons. Fire arm field recordings on their own are rarely very interesting or particularly
distinct. This is in part because of the difficulty in capturing the character and impact of sounds at
extreme volume levels. Raw field recordings of fire arms tend to sound similar. To account for this, sound
designers need create hyper-realistic gun shot sounds with a variety of explosive, mechanical, and
environmental layers and processing in order to create the explosive, powerful sounds that audiences expect.
This is both more authentic than a simple gun shot field recording, and more emotionally impactful. A core
goal of satisfying weapon sounds is to recreate the visceral, explosive impact of firing them.

Given that, in situations where a large variety of weapons are called for, the sound designer will need to
differentiate each of these weapons. This is especially true of games with a large selection of realistic
weapons. It is important to both establish unique character for each and communicate that distinction to the
player, who should ideally be able to tell what weapon is being fired at them from the sound. A sniper rifle
might have an exaggerated, long reverb tell to really sell its firepower. Pistols and submachine guns might
emphasize the mechanical elements over the explosive punch and the reverb tail to make it feel smaller. An
assault rifle might lie somewhere in between.

Establishing these rhetorical choices and applying them consistently provides emotional satisfaction,
authenticity, and clarity to the player.
