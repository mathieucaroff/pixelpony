export interface Pony {
   name: string
   body: {
      coat: Colorful
      mane: Colorful & Shapeful
      tail: Colorful & Shapeful
      eye: Colorful
      wing?: Colorful & {
         kind: 'bird' | 'bat' | 'changeling'
      }
      horn?: Colorful & {
         kind: 'common' | 'long' | 'curved'
      }
   }
}

export interface Colorful {
   color: string
}

export interface Shapeful<Tchoice extends string = string> {
   shape: Tchoice
}
