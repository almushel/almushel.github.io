# Sound Effect Variation in Unity

One of the most fundamental elements of satisfying interactive audio implementation is variation. When you
play same sound effect repeatedly, it tends to draw attention to itself through its artificial precision.
Natural sounds have all kinds of subtle inconsistencies that we take for granted.

To address this problem, games use multiple pre-recorded variants of most of their sound effects and some
additional modifications on playback. In this post, I’m going to walk through implementing basic variations
within native Unity audio, assuming you already have a set of sound effects to use.

## Setting Up

First, we’ll start with simple round robin, or playing each variation in a predefined, looped order. Next,
we’ll randomize the playing order and ensure that the same audio clip doesn’t play back-to-back. Finally,
we’ll look at using pitch and volume randomization to add some more subtle differences every time these
sounds are played.

Before we do any specific implementation, we need a game object with an Audio Source component attached to
it. Create a new one or use an existing object in your game that needs to make some noise.

![AudioSource 2](/files/images/AddAudioSource2.gif)

## Round Robin

To play our variations, we need to store them in a container Unity can work with: an array of AudioClips.

`public AudioClip[] clipArray;`

We also need to define an Audio Source to the play our sound effects.

`public AudioSource effectSource;`

And an integer variable to keep track of our current array index.

`private int clipIndex;`

In the inspector, set Effect Source to your AudioSource component, set the Clip Array size based on the
number of variations you’re using, and add your AudioClips to the array.

![Sound Effect Variation Script](/files/images/SoundEffectVariation-Script.png)

Now, for the playback itself. We’ll create a new method, PlayRoundRobin(). Every time this method is called,
it will play the current index of the array then increment the clipIndex value. If the index is beyond the
boundaries of the array, it is reset to 0 and the round robin continues.

```
void PlayRoundRobin() {
    if (clipIndex && clipArray.Length) {
        effectSource.PlayOneShot(clipArray[clipIndex]);
        clipIndex++;
    }

    else {
        clipIndex = 0;
        effectSource.PlayOneShot(clipArray[clipIndex]);
        clipIndex++;
    }
}
```

Each time this method is called, it will play the next variation in whatever order you’ve established in the
array, starting over when it reaches the end of the array.

## Clip Randomization

Next, we’ll write another simple method in the same script to play the clips from the array in a (pseudo) random order.

```
void PlayRandom() {
    clipIndex = Random.Range(0, clipArray.Length);
    effectSource.PlayOneShot(clipArray[clipIndex]);
}
```

This will generate a random number between 0 and the last index of the array, then play the audio clip stored
at that index.

## Avoiding Repetition

While this barebones randomization is serviceable, it still has a clear limitation: there is nothing
preventing it from generating the same random index multiple times in a row, exactly the kind of thing
we're trying to avoid with randomization. Fortunately, the solution to this problem is pretty simple.

We’ll compare each new random number to the last index used. If they are equal, we’ll generate a new one. To
do this, we’ll create a new method, RepeatCheck(), that takes the last used index and the random range (for
our purposes, this is the array length).

```
int RepeatCheck(int previousIndex, int range) {
    int index = Random.Range(0, range);

    while (index == previousIndex) {
        index = Random.Range(0, range);
    }

    return index;
}
```

This will continue to generate random numbers within the given range until it generates a value that is not
equal to our previous index. It then returns that value. So, now we can plug this into our PlayRandom() method.

```
void PlayRandom2() {
    clipIndex = RepeatCheck(clipIndex, clipArray.Length);
    effectSource.PlayOneShot(clipArray[clipIndex]);
}
```

When this method is called, it will never play the same random variation back-to-back.

## Pitch and Volume Randomization

Now, the last thing we're going to do is randomize the pitch and volume of our Audio Source each time
we play our sound effects. We’ll need a few more variables, so we can fine tune this effect easily in Unity.

`public float pitchMin, pitchMax, volumeMin, volumeMax;`

Set these values in the Inspector according to preference. This may vary depending on the specific sound
effect, but in general very small ranges will sound more natural. Larger ranges sound jarring and unnatural
(though that could be a useful effect in some cases). Set these values to 1 for no effect at all.

![PitchVolumeMinMax](/files/images/PitchVolumeMinMax.gif)

Add these two new lines to the beginning of the PlayRandom() and PlayRoundRobin() methods:

```
effectSource.pitch = Random.Range(pitchMin, pitchMax);
effectSource.volume = Random.Range(volumeMin, volumeMax);
```

Each variation will now playback at a random pitch and volume according to the ranges you set and can easily
adjust in the Unity editor.

## Testing it Out

If you want to make sure this is working, without assets or systems to go with it, you can just drop a game
object with an Audio Source and the script attached into an empty scene. Add something like this to your
Update() method.

```
void Update () {
    if (Input.GetButtonUp("Fire1")) PlayRoundRobin();
    if (Input.GetButtonUp("Fire2")) PlayRandom2();
}
```

Now you can trigger each method with the Fire1 and Fire2 bindings respectively, which are Mouse 0/Left Ctrl
and Mouse 1/Left Alt by default.
