import os, sys

from keras.models import Model
from keras.layers import Input, LSTM, GRU, Dense, Embedding
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.utils import to_categorical
import numpy as np
import matplotlib.pyplot as plt

BATCH_SIZE = 64
EPOCHS = 20
LSTM_NODES =256
NUM_SENTENCES = 3000 # sentences to train
MAX_SENTENCE_LENGTH = 50
MAX_NUM_WORDS = 20000
EMBEDDING_SIZE = 100

input_sentences = []

output_sentences = []
output_sentences_inputs = []

count = 0
for line in open(r'combination_questions.txt', encoding="utf-8"):
    count += 1
    # print(count, NUM_SENTENCES)
    if count > NUM_SENTENCES:
        break

    input_sentence = line.split('","ans', 1)[0].strip().split('":"', 1)[-1]
    output = line.split('","answer":', 1)[-1].strip().split('}', 1)[0]
       
    output_sentence = output + ' <eos>'
    # print("The output is: ", output)
    # print("The outputsentence is: ", output_sentence) 
    output_sentence_input = '<sos> ' + output

    input_sentences.append(input_sentence) # encoder input
    output_sentences.append(output_sentence) # decoder output
    output_sentences_inputs.append(output_sentence_input) # decoder input

print("num samples input:", len(input_sentences))
print("num samples output:", len(output_sentences))
print("num samples output input:", len(output_sentences_inputs))

print("Input sentence: ", input_sentences[172])
print("Output sentence: ", output_sentences[172])
print("Input Output: ", output_sentences_inputs[172])